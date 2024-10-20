import { Import, MoreHorizontal, PlusIcon } from "lucide-react";
import { CustomDropdown } from "./components/CustomDropdown";
import { Datatable, SortedFilterColumn } from "./components/Datatable";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "./DashboardLayout";
import { PageLoader } from "./components/Loader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { AuditLogEventType } from "./components/AuditLogEventType";

export const AuditTrail = () => {
  const { client } = useClient();

  const {
    isLoading,
    error,
    data: auditLog,
  } = useQuery(["audittrail"], () => client.audittrail.fetchAuditTrail(), {
    refetchInterval: 60000, // every 1 minute
    retry: false,
  });

  if (isLoading) {
    return <PageLoader />;
  } else if (error) {
    return <div className="text-red-600">{(error as Error).message}</div>;
  }

  // console.log({ auditLog });
  // const queryClient = useQueryClient();

  const columns = [
    // {
    //   id: "collpase",
    //   header: () => (
    //     <div className="bg-red-200">
    //       <Button variant="ghost">
    //         <ChevronsUpDown className="h-4 w-4" />
    //       </Button>
    //     </div>
    //   ),
    // },
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
          className=""
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "timestamp",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Timestamp", column, table),
      cell: ({ row }: { row: any }) => {
        return <div>{row.original.timestamp}</div>;
      },
    },
    {
      accessorKey: "audit_type.Name",
      header: "Audit Type",
      cell: ({ row }: { row: any }) => {
        return <div className="">{row.original.audit_type.Name}</div>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: any }) => {
        return <div className="">{row.original.action}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Status", column, table),

      cell: ({ row }: { row: any }) => {
        return <div>{row.original.status}</div>;
      },
    },

    {
      accessorKey: "actor.id",
      header: "Actor",
      cell: ({ row }: { row: any }) => {
        return <div>{row.original.actor.id}</div>;
      },
    },
    {
      accessorKey: "context.user_agent",
      header: "User Agent",
      cell: ({ row }: { row: any }) => {
        return <div>{row.original.context.user_agent}</div>;
      },
    },
    {
      accessorKey: "context.client_ip",
      header: "Source Address",
      cell: ({ row }: { row: any }) => {
        return <div>{row.original.context.client_ip}</div>;
      },
    },

    // {
    //   id: "actions",
    //   cell: ({ row }: { row: any }) => {
    //     const service = row.original;

    //     const actionItems = [
    //       {
    //         text: "Edit",
    //         onclick: () => {},
    //       },
    //       {
    //         text: "Delete",
    //         onclick: () => {
    //           // onDeleteService(service.id);
    //           // doDelete.mutate(service.id);
    //         },
    //       },
    //     ];

    //     return (
    //       <CustomDropdown
    //         triggerElement={
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open Menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         }
    //         items={actionItems}
    //       />
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Tabs className="w-full " defaultValue="logs">
        <TabsList className="grid items-baseline justify-normal">
          <div className="w-full flex-col md:flex-row flex-auto justify-between space-y-2 md:space-y-0 md:space-4">
            <TabsTrigger
              value="logs"
              className="flex-1 bg-green-50 data-[state=active]:bg-blue-200 data-[state=active]:font-semibold data-[state=active]:text-xl"
            >
              <h1 className=" text-gray-900">Audit Logs</h1>
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex-1 bg-green-50 border-none data-[state=active]:bg-blue-200 data-[state=active]:font-semibold data-[state=active]:text-xl "
            >
              <h1 className=" text-gray-900"> Event Types</h1>
            </TabsTrigger>
          </div>
          <TabsContent value="logs" className="w-full overflow-hidden ">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 space-y-4 md:space-y-0">
              <p className="text-sm text-gray-700">
                Track and visualize your audit logs
              </p>
              <Button
                type="button"
                className="inline-flex items-center justify-center space-x-1 rounded-md border border-transparent bg-[#00df9a] border-[#00df9a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 sm:w-auto"
                onClick={() => {}}
              >
                <Import /> <span>Import Audit Logs</span>
              </Button>
            </div>
            <div className="mt-2 flex flex-col mx-1">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 mx-4 md:mx-0 rounded mt-4 md:mt-0 ring-opacity-5 md:rounded-lg">
                    {!auditLog || auditLog.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        There are no logs at this time.
                      </div>
                    ) : (
                      <>
                        <Datatable
                          columns={columns}
                          data={auditLog}
                          isCollapsible={true}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="events" className="w-full overflow-hidden ">
            <AuditLogEventType client={client} />
          </TabsContent>
        </TabsList>
      </Tabs>

      {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div> */}

      {/* <CustomAlertDialog
        open={openDialog}
        onAlertClosed={() => setOpenDialog(false)}
        onSubmit={() => {
          console.log("SERVICE", selectedService);
          doDelete.mutate(selectedService!);
        }}
      /> */}
    </>
  );
};
