import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  GroupingState,
  SortingState,
  Table as TanstackTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CsvParser from "papaparse";

import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  ChevronsLeftRight,
  ChevronsUpDown,
  SlidersHorizontal,
  ToggleLeftIcon,
} from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { AuditDataJsonViewer, AuditDataJsonViewerSheet } from "./AuditJsonView";
import { AuditTrailDetail } from "./AuditTrailDetail";

export const SortedFilterColumn = (
  fieldName: string,
  column: Column<any, unknown>,
  table: TanstackTable<Service>
) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col my-1">
      <div className="flex items-center p-0 space-x-2 ">
        <Button
          className="flex items-center p-0 min-w-max"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-sm text-justify">{fieldName}</span>
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      </div>
      {showFilter && (
        <Input
          placeholder={`Filter ${column.id ?? "field"}`}
          value={column.getFilterValue() as string}
          onChange={(event) => column.setFilterValue(event.target.value)}
          className="max-w-sm bg-white"
        />
      )}
    </div>
  );
};

export type Service = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  status: string;
  webhook_url: string;
  notification_email: string;
};

interface DataTableProps<TData, TValue> {
  searchableField?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyErrorMsg?: string;
  setEditForm?: Function;
  setEditFormState?: Function;
  onDeleteService?: Function;
  isCollapsible?: boolean;
}

const exportData = (dataset: Array<any>, visibleColumns?: Array<any>) => {
  const data = dataset?.map((d) => d.original);

  const filteredColumns = visibleColumns?.filter(
    (column) => !["select", "actions"].includes(column.id)
  );

  const formattedColumns = filteredColumns?.map((column) => {
    return {
      key: column.id,
      value:
        typeof column.columnDef.header === "function"
          ? column.id
          : column.columnDef.header!.toString(),
    };
  });

  const columnKeys = formattedColumns?.map((c) => c.key);

  const formmatedValues = data
    .map((r) => {
      let obj: Record<string, unknown> = {};
      for (let i = 0; i <= columnKeys!.length; i++) {
        const key = columnKeys![i];
        obj[key] = r[key];
      }
      return obj;
    })
    .map((row) => {
      return Object.values(row);
    });

  const csvString = CsvParser.unparse({
    fields: formattedColumns?.map((c) => c.value)!,
    data: formmatedValues,
  });

  const blob = new Blob([csvString], { type: "text/csv" });

  const blobURL = window.URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.download = `uptimer-export-${Date.now()}.csv`;
  anchor.href = blobURL;
  anchor.dataset.downloadurl = ["text/csv", anchor.download, anchor.href].join(
    ":"
  );
  anchor.click();

  // Remove URL.createObjectURL. The browser should not save the reference to the file.
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    URL.revokeObjectURL(blobURL);
  }, 100);
};

export const Datatable = <TData, TValue>({
  columns,
  data,
  emptyErrorMsg = "No results",
  setEditFormState,
  setEditForm,
  onDeleteService,
  isCollapsible = false,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,

    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
      grouping,
      expanded,
    },
  });

  const toggleRow = (rowId: string) => {
    setExpandedRows((previousExpandedRows) => ({
      ...previousExpandedRows,
      [rowId]: !previousExpandedRows[rowId],
    }));
  };

  return (
    <div className="mt-2 w-full">
      <div className="flex items-center justify-between py-4 ">
        <Input
          placeholder={`Search all columns`}
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm bg-white"
        />

        <div className="flex items-center space-x-2 ">
          <Button
            variant="outline"
            className="ml-2"
            onClick={(event) =>
              exportData(
                table.getFilteredRowModel().rows,
                table.getVisibleFlatColumns()
              )
            }
          >
            Export CSV
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <SlidersHorizontal className="mr-1" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                      className="capitalize"
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border bg-white overflow-x-scroll">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {isCollapsible && (
                  <TableHead>
                    {/* <Button variant="ghost">
                      <ChevronsLeftRight className="h-4 w-4" />
                    </Button> */}
                  </TableHead>
                )}
                {group.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) =>
                !isCollapsible ? (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    // onClick={() => {
                    //   navigate(`/dashboard/history`, {
                    //     state: {
                    //       id: row.original?.site_id,
                    //       url: row.original?.url,
                    //     },
                    //   });
                    // }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.getIsGrouped() ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <Button
                              className={cn(
                                "bg-transparent text-gray-800 dark:text-white",
                                row.getCanExpand() ? "cursor-pointer" : ""
                              )}
                              {...{ onClick: row.getToggleExpandedHandler() }}
                            >
                              {row.getIsExpanded() ? "👇" : "👉"}{" "}
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}{" "}
                              ({row.subRows.length})
                            </Button>
                          </>
                        ) : cell.getIsAggregated() ? (
                          // If the cell is aggregated, use Aggegated renderer for cell
                          flexRender(
                            cell.column.columnDef.aggregatedCell ??
                              cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : cell.getIsPlaceholder() ? null : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ) : (
                  <Collapsible
                    key={row.id}
                    asChild
                    open={expandedRows[row.id]}
                    onOpenChange={() => toggleRow(row.id)}
                  >
                    <>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost">
                              {expandedRows[row.id] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.getIsGrouped() ? (
                              // If it's a grouped cell, add an expander and row count

                              <Button
                                className={cn(
                                  "bg-transparent text-gray-800 dark:text-white",
                                  row.getCanExpand() ? "cursor-pointer" : ""
                                )}
                                {...{
                                  onClick: row.getToggleExpandedHandler(),
                                }}
                              >
                                {row.getIsExpanded() ? "👇" : "👉"}{" "}
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}{" "}
                                ({row.subRows.length})
                              </Button>
                            ) : cell.getIsAggregated() ? (
                              // If the cell is aggregated, use Aggegated renderer for cell
                              flexRender(
                                cell.column.columnDef.aggregatedCell ??
                                  cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            ) : cell.getIsPlaceholder() ? null : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      <AuditTrailDetail row={row} />
                    </>
                  </Collapsible>
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyErrorMsg}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 mx-2">
          <div className="flex-1 text-sm text-muted-foreground mx-2">
            {table.getFilteredSelectedRowModel().rows?.length} of{" "}
            {table.getFilteredRowModel().rows?.length} row(s) selected.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
