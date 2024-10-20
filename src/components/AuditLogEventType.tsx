import Client from "@/client";
import { CreateAuditEventType, FormState } from "./CreateAuditEventType";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLoader } from "./Loader";
import { CustomDropdown } from "./CustomDropdown";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Datatable, SortedFilterColumn } from "./Datatable";

export const AuditLogEventType = ({ client }: { client: Client }) => {
  const [formOpen, setFormOpen] = useState(false);

  const [eventTypeState, setEventTypeStatue] = useState<FormState>({
    name: "",
    description: "",
    action: "create",
  });

  const {
    isLoading,
    error,
    data: eventTypes,
  } = useQuery(
    ["auditEventTypes"],
    () => client.audittrail.fetchAuditEventTypes(),
    {
      refetchInterval: 60000, // every 1 minute
      retry: false,
    }
  );

  if (isLoading) {
    return <PageLoader />;
  } else if (error) {
    return <div className="text-red-600">{(error as Error).message}</div>;
  }

  console.log({ eventTypes });

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
      accessorKey: "id",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("ID", column, table),
      cell: ({ row }: { row: any }) => {
        return <div>{row.original.id}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Action Name",
      cell: ({ row }: { row: any }) => {
        return <div className="">{row.original.name}</div>;
      },
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }: { row: any }) => {
        return <div className="">{row.original.slug}</div>;
      },
    },
    {
      accessorKey: "description",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Description", column, table),

      cell: ({ row }: { row: any }) => {
        return <div>{row.original.description}</div>;
      },
    },

    {
      id: "actions",
      cell: ({ row }: { row: any }) => {
        const service = row.original;

        const actionItems = [
          {
            text: "Edit",
            onclick: () => {},
          },
          {
            text: "Delete",
            onclick: () => {
              // onDeleteService(service.id);
              // doDelete.mutate(service.id);
            },
          },
        ];

        return (
          <CustomDropdown
            triggerElement={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal />
              </Button>
            }
            items={actionItems}
          />
        );
      },
    },
  ];
  return (
    <>
      <div className=" w-full flex flex-col md:flex-row items-start md:items-center justify-between mt-4 space-y-4 md:space-y-0">
        <div className="sm:flex-auto">
          <p className="text-sm text-gray-700 ">
            Manage Audit Event Types. Audit Event Types are categories
            <br></br>
            that is used to group and create logs in your system
          </p>
        </div>
        <div className="sm:mt-0 sm:ml-16 sm:flex-none">
          <CreateAuditEventType
            client={client}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            formState={eventTypeState}
            setFormState={setEventTypeStatue}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col ">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 mx-6 md:mx-1 rounded mt-4 md:mt-0 ring-opacity-5 md:rounded-lg">
              {!eventTypes || eventTypes.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  You do not have audit event types. create one now.
                </div>
              ) : (
                <>
                  <Datatable
                    columns={columns}
                    data={eventTypes}
                    isCollapsible={false}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
