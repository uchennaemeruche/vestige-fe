import Client from "@/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  NotificationConfiguration,
  CustomSwitch,
  FormState,
} from "./ServiceConfiguration";
import { useState } from "react";
import { SortedFilterColumn, Datatable } from "./Datatable";
import { StatusBadge } from "./StatusBadge";
import { TimeSince } from "./TimeFormatter";
import { DateTime } from "luxon";
import { Checkbox } from "./ui/checkbox";
import { CustomDropdown } from "./CustomDropdown";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomAlertDialog } from "./CustomAlertDialog";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { PageLoader } from "./Loader";

export const SiteList = ({ client }: { client: Client }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedService, setSelectedService] = useState<string>();

  const navigate = useNavigate();

  const { toast } = useToast();

  const [serviceState, setServiceState] = useState<FormState>({
    slug: "",
    ping_frequency: "",
    url: "",
    webhook_address: "",
    email_address: "",
    description: "",
    watch_service: true,
    enable_email_notification: true,
    enable_webhook_notification: true,
    action: "create",
  });

  // const { isLoading, error, data } = useQuery(
  //   ["sites"],
  //   () => client.site.List(),
  //   {
  //     refetchInterval: 10000, // 10s
  //     retry: false,
  //   }
  // );
  const {
    isLoading,
    error,
    data: watchlist,
  } = useQuery(["watchlist"], () => client.uptime.fetchWatchlistItems(), {
    refetchInterval: 60000, // every 1 minute
    retry: false,
  });

  const queryClient = useQueryClient();

  const doDelete = useMutation(
    (id: string) => {
      return client.uptime.deleteWatchItem(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["watchlist"]);
        toast({
          variant: "default",
          className: cn("fixed top-5 right-5 w-[400px] bg-green-200"),
          title: "Service deleted!",
          description: "Service deleted successfully",
        });
        setOpenDialog(false);
      },
    }
  );

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
      accessorKey: "url",
      header: ({ column, table }: { column: any; table: any }) =>
        SortedFilterColumn("Service", column, table),
      cell: ({ row }: { row: any }) => {
        const dt = row.original && DateTime.fromISO(row.original.last_checked);
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              console.log("CLIECKED RESULT", row);
              navigate(`/dashboard/history`, {
                state: {
                  id: row.original?.id,
                  url: row.original?.url,
                },
              });
            }}
          >
            <p>{row.original.url}</p>
            <p className="text-gray-400 italic">
              <span>Last checked: </span>
              {row.original.last_checked ? (
                <TimeSince dt={dt} />
              ) : (
                <StatusBadge status={undefined} />
              )}
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
        return <StatusBadge status={row.original?.is_up ?? undefined} />;
      },
    },

    {
      accessorKey: "webhook_address",
      header: "Webhook URL",
      cell: ({ row }: { row: any }) => {
        return (
          <CustomSwitch
            isChecked={row.original.enable_webhook_notification}
            setIsChecked={() => {}}
            toolTip=""
            bgColor="bg-blue-600"
            disabled={true}
          />
        );
      },
    },
    {
      accessorKey: "email_address",
      header: "Notification Email",
      cell: ({ row }: { row: any }) => {
        return (
          <CustomSwitch
            isChecked={row.original.enable_email_notification}
            setIsChecked={() => {}}
            toolTip=""
            bgColor="bg-blue-600"
            disabled={true}
          />
        );
      },
    },
    {
      accessorKey: "is_watching",
      header: "Active Watch",
      cell: ({ row }: { row: any }) => {
        return (
          <div className="">{row.original.is_watching ? "Yes" : "No"}</div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: { row: any }) => {
        const service = row.original;

        const actionItems = [
          {
            text: "Edit",
            onclick: () => {
              setServiceState({
                id: service.id,
                ping_frequency: service.ping_frequency,
                slug: service.slug,
                url: service.url,
                webhook_address: service.webhook_address,
                email_address: service.email_address,
                description: service.description,
                action: "update",
                enable_email_notification: service.enable_email_notification,
                enable_webhook_notification:
                  service.enable_webhook_notification,
                watch_service: service.is_watching,
              });
              setFormOpen(true);
            },
          },
          {
            text: "Delete",
            onclick: () => {
              // onDeleteService(service.id);
              setOpenDialog(true);
              setSelectedService(service.id);
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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Watch List</h1>

          <p className="mt-2 text-sm text-gray-700">
            Monitored services and configuration.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <NotificationConfiguration
            client={client}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            setFormState={setServiceState}
            formState={serviceState}
          />
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div> */}
      </div>

      <CustomAlertDialog
        open={openDialog}
        onAlertClosed={() => setOpenDialog(false)}
        onSubmit={() => {
          console.log("SERVICE", selectedService);
          doDelete.mutate(selectedService!);
        }}
      />

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 mx-4 md:mx-0 rounded mt-4 md:mt-0 ring-opacity-5 md:rounded-lg">
              {!watchlist || watchlist.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  Nothing to monitor yet. Add a website to see it here.
                </div>
              ) : (
                <>
                  <Datatable columns={columns} data={watchlist} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
