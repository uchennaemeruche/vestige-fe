import { Link, useLocation } from "react-router-dom";
import { SortedFilterColumn, Datatable } from "./components/Datatable";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "./DashboardLayout";
import { useEffect, useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import { DateTime } from "luxon";
import { TimeSince } from "./components/TimeFormatter";
import { StatusBadge } from "./components/StatusBadge";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CustomTooltip } from "./components/CustomTooltip";
import { cn } from "./lib/utils";
import { PageLoader } from "./components/Loader";

export const ServiceHistory = () => {
  const { url, id } = useLocation().state;

  const [filter, setFilter] = useState("24h");

  const { client } = useClient();

  const fetchStatus = () => {
    return client.uptime.fetchServiceHistory(id);
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["downtimes", id],
    fetchStatus,
    {
      // refetchInterval: 10000, // 10s
      // retry: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [filter]);

  if (isLoading) {
    return <PageLoader />;
  } else if (error) {
    return <div className="text-red-600">{(error as Error).message}</div>;
  }

  const columns = [
    {
      id: "select",
      header: ({ table }: { table: any }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: any }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "checked_at",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Date/Time", column, table),
      cell: ({ row }: { row: any }) => {
        const dt = row.original && DateTime.fromISO(row.original.checked_at);
        return (
          <div>
            <p>{row.original.checked_at}</p>
            <p className="text-gray-400 italic">
              (<TimeSince dt={dt} />)
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "is_up",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Status", column, table),

      cell: ({ row }: { row: any }) => {
        return <StatusBadge status={row.original.is_up} />;
      },
    },

    {
      accessorKey: "response_time",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Response Time", column, table),
      cell: ({ row }: { row: any }) => {
        const time =
          row.original && DateTime.fromMillis(row.original.response_time, {});
        return (
          <div>
            <p>{row.original.response_time} milliseconds</p>
          </div>
        );
      },
    },

    {
      accessorKey: "status_code",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Response Code", column, table),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            <p className="text-gray-400 italic">{row.original.status_code}</p>
          </div>
        );
      },
    },

    {
      accessorKey: "error_msg",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Response Message", column, table),
      cell: ({ row }: { row: any }) => {
        return (
          <div>
            <p className="text-gray-400 italic">{row.original.error_msg}</p>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="flex items-center space-x-4">
            <Link to={`/dashboard`}>
              <Button className="bg-transparent text-gray-900 border border-gray-600 hover:bg-white">
                <ArrowLeft />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Service Health Log
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Service outage/uptime history of ({url})
          </p>
        </div>
        <div className="flex bg-white text-gray-900 rounded">
          {["1h", "6h", "24h", "7d", "30d", "All"].map((value, i) => (
            <Button
              onClick={() => {
                setFilter(value);
              }}
              key={i}
              className={cn(
                value == filter
                  ? "bg-green-500 text-white hover:bg-green-500"
                  : "bg-transparent text-gray-800 hover:bg-green-50"
              )}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex my-4 bg-white rounded-lg p-1">
        {data?.map((downtime, i) => (
          <CustomTooltip
            key={i}
            content={
              <div className="flex items-center space-x-2">
                <div
                  className={`w-5 h-16 rounded ${
                    downtime.is_up ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <div className="flex flex-col">
                  <p>{downtime.checked_at}</p>
                  <p>
                    Status: <StatusBadge status={downtime.is_up} />
                  </p>
                  <p>Duration: Unavailable</p>
                  <p>Remarks: Unavailable</p>
                </div>
              </div>
            }
            el={
              <div
                style={{
                  width: `${Math.ceil((100 / data.length) * 1000)}px`,
                }}
                className={`h-16  rounded mx-1 ${
                  downtime.is_up ? "bg-green-400" : "bg-red-400"
                }`}
              >
                {}
              </div>
            }
          />
        ))}
      </div>

      {!data || data.length == 0 ? (
        <div className="text-center text-gray-400 py-8">
          No available health history
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1  ring-opacity-5 md:rounded-lg">
          <Datatable
            columns={columns}
            data={data}
            emptyErrorMsg="No available health history"
          />
        </div>
      )}
    </div>
  );
};

// export default ServiceHistory;
