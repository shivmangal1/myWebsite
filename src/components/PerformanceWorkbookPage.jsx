import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import workbookUrl from '../data/Shiv 2026.xlsx?url';

const preferredColumnOrder = ['Date', 'Script', 'Stockedge Link', 'Current Price', 'Target', '% Moves'];

function normalizeHeaderText(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function normalizeRowsFromSheet(worksheet) {
  const matrix = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
    raw: false,
    blankrows: false,
  });

  if (!matrix.length) {
    return [];
  }

  const headerRow = matrix[0].map((cell) => String(cell ?? '').trim());
  const headerMap = {
    date: headerRow.findIndex((column) => normalizeHeaderText(column) === 'date'),
    script: headerRow.findIndex((column) => normalizeHeaderText(column) === 'script'),
    stockedgeLink: headerRow.findIndex((column) => normalizeHeaderText(column) === 'stockedge link'),
    currentPrice: headerRow.findIndex((column) => normalizeHeaderText(column) === 'current price'),
    target: headerRow.findIndex((column) => normalizeHeaderText(column) === 'target'),
    percentMoves: headerRow.findIndex((column) => normalizeHeaderText(column) === '% moves'),
  };

  const missingRequired = Object.values(headerMap).some((index) => index < 0);
  if (missingRequired) {
    throw new Error('Unable to find expected columns in 2025 sheet.');
  }

  return matrix
    .slice(1)
    .map((row) => ({
      Date: String(row[headerMap.date] ?? '').trim(),
      Script: String(row[headerMap.script] ?? '').trim(),
      'Stockedge Link': String(row[headerMap.stockedgeLink] ?? '').trim(),
      'Current Price': String(row[headerMap.currentPrice] ?? '').trim(),
      Target: String(row[headerMap.target] ?? '').trim(),
      '% Moves': String(row[headerMap.percentMoves] ?? '').trim(),
    }))
    .filter((row) => row.Date || row.Script || row['Stockedge Link'] || row['Current Price'] || row.Target || row['% Moves']);
}

function parseNumeric(value) {
  if (typeof value === 'number') {
    return value;
  }

  const parsed = Number(String(value ?? '').replace(/,/g, '').replace('%', '').trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function resolveColumns(rows) {
  const allColumns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const orderedPreferred = preferredColumnOrder
    .map((preferred) => allColumns.find((column) => column.toLowerCase() === preferred.toLowerCase()))
    .filter(Boolean);
  const remaining = allColumns.filter((column) => !orderedPreferred.includes(column));
  return [...orderedPreferred, ...remaining];
}

function isLinkColumn(columnName) {
  return /link/i.test(columnName);
}

function isPercentMoveColumn(columnName) {
  return /%\s*moves?/i.test(columnName);
}

function isDateColumn(columnName) {
  return /^date$/i.test(String(columnName).trim());
}

function isScriptColumn(columnName) {
  return /^script$/i.test(String(columnName).trim());
}

function isNumericColumn(columnName) {
  return /current price|target/i.test(String(columnName).trim());
}

function formatDateForDisplay(value, fallbackYear = '2025') {
  const raw = String(value ?? '').trim();
  if (!raw) {
    return '';
  }

  if (/^\d{1,2}\s+[A-Za-z]{3}\s+\d{4}$/.test(raw)) {
    const [dayPart, monthPart, yearPart] = raw.split(/\s+/);
    return `${dayPart.padStart(2, '0')} ${monthPart.slice(0, 3)} ${yearPart}`;
  }

  const normalized = raw
    .replace(/-/g, ' ')
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const hasYear = /\b\d{4}\b/.test(normalized);
  const parseTarget = hasYear ? normalized : `${normalized} ${fallbackYear}`;
  const parsed = new Date(parseTarget);

  if (Number.isNaN(parsed.getTime())) {
    return raw;
  }

  const day = String(parsed.getDate()).padStart(2, '0');
  const month = parsed.toLocaleString('en-IN', { month: 'short' });
  const year = String(parsed.getFullYear());
  return `${day} ${month} ${year}`;
}

function getCellClassName(columnName) {
  const classes = ['table-cell'];

  if (isDateColumn(columnName)) {
    classes.push('date-col');
  }

  if (isScriptColumn(columnName)) {
    classes.push('script-col');
  }

  if (isLinkColumn(columnName)) {
    classes.push('link-col');
  }

  if (isNumericColumn(columnName)) {
    classes.push('num-col');
  }

  if (isPercentMoveColumn(columnName)) {
    classes.push('moves-col');
  }

  return classes.join(' ');
}

function getLinkLabel(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch {
    return url;
  }
}

function PerformanceWorkbookPage() {
  const [rows, setRows] = useState([]);
  const [sheetName, setSheetName] = useState('2025');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    let isMounted = true;

    async function loadWorkbook() {
      try {
        const response = await fetch(workbookUrl);
        if (!response.ok) {
          throw new Error('Unable to load workbook file.');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const targetSheetName = workbook.SheetNames.find((name) => /^2025$/i.test(String(name).trim()));
        if (!targetSheetName) {
          throw new Error('Sheet named 2025 was not found in the workbook.');
        }

        const worksheet = workbook.Sheets[targetSheetName];
        const normalizedRows = normalizeRowsFromSheet(worksheet);

        if (isMounted) {
          setSheetName(targetSheetName);
          setRows(normalizedRows);
          setCurrentPage(1);
          setLoading(false);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to read workbook data.');
          setLoading(false);
        }
      }
    }

    loadWorkbook();

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = useMemo(() => resolveColumns(rows), [rows]);

  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const pageStart = rows.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const pageEnd = Math.min(currentPage * rowsPerPage, rows.length);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [rows, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const summary = useMemo(() => {
    const percentColumn = columns.find((column) => isPercentMoveColumn(column));
    const moveValues = percentColumn
      ? rows.map((row) => parseNumeric(row[percentColumn])).filter((value) => value !== null)
      : [];

    const averageMove = moveValues.length
      ? moveValues.reduce((sum, value) => sum + value, 0) / moveValues.length
      : null;

    const topMove = moveValues.length ? Math.max(...moveValues) : null;
    const worstMove = moveValues.length ? Math.min(...moveValues) : null;

    return {
      rowCount: rows.length,
      columnCount: columns.length,
      averageMove,
      topMove,
      worstMove,
    };
  }, [rows]);

  return (
    <section className="performance-page">
      <div className="performance-card">
        <div className="performance-card-top">
          <div className="performance-metrics">
            <article>
              <p>Sheet</p>
              <strong>{sheetName}</strong>
            </article>
            <article>
              <p>Total Rows</p>
              <strong>{summary.rowCount}</strong>
            </article>
            <article>
              <p>Total Columns</p>
              <strong>{summary.columnCount}</strong>
            </article>
            <article>
              <p>Avg % Moves</p>
              <strong>{summary.averageMove !== null ? `${summary.averageMove.toFixed(2)}%` : 'N/A'}</strong>
            </article>
          </div>
        </div>

        <div className="performance-table-wrap">
          {loading && <p className="performance-status">Loading workbook data...</p>}
          {!loading && error && <p className="performance-status performance-status-error">{error}</p>}

          {!loading && !error && (
            <table className="performance-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} className={getCellClassName(column)}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {columns.map((column) => {
                      const value = row[column];
                      const textValue = String(value ?? '');

                      if (isLinkColumn(column) && /^https?:\/\//i.test(textValue.trim())) {
                        return (
                          <td key={`${rowIndex}-${column}`} className={getCellClassName(column)}>
                            <a href={textValue} target="_blank" rel="noreferrer" title={textValue}>{getLinkLabel(textValue)}</a>
                          </td>
                        );
                      }

                      if (isPercentMoveColumn(column)) {
                        const numericValue = parseNumeric(value);
                        const valueClass = typeof numericValue === 'number' && numericValue < 0
                          ? 'loss moves-cell'
                          : 'profit moves-cell';
                        return <td key={`${rowIndex}-${column}`} className={`${getCellClassName(column)} ${valueClass}`}>{textValue}</td>;
                      }

                      if (isDateColumn(column)) {
                        return (
                          <td key={`${rowIndex}-${column}`} className={getCellClassName(column)}>
                            {formatDateForDisplay(value, sheetName)}
                          </td>
                        );
                      }

                      return <td key={`${rowIndex}-${column}`} className={getCellClassName(column)}>{textValue}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && !error && rows.length > rowsPerPage && (
            <div className="performance-pagination">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pagination-center" aria-label="Current table page">
                <button
                  type="button"
                  className="pagination-arrow"
                  onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  &lt;
                </button>
                <span className="pagination-indicator">Page {currentPage} of {totalPages}</span>
                <button
                  type="button"
                  className="pagination-arrow"
                  onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  &gt;
                </button>
              </div>

              <span className="pagination-meta">Showing {pageStart}-{pageEnd} of {rows.length}</span>

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PerformanceWorkbookPage;
