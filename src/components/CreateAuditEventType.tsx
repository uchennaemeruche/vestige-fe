import Client from "@/client";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { CustomTooltip } from "./CustomTooltip";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

export interface FormState {
  name: string;
  description?: string;
  action: "update" | "create";
}

export const CustomSwitch = ({
  bgColor = "bg-green-600",
  isChecked,
  setIsChecked,
  toolTip,
  disabled = false,
}: {
  disabled?: boolean;
  toolTip?: string;
  bgColor?: string;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        disabled={disabled}
        checked={isChecked}
        onChange={setIsChecked}
        className={`${isChecked ? bgColor : "bg-gray-200"} ${
          disabled ? "opacity-50" : ""
        } relative inline-flex h-6 w-11 items-center rounded-full `}
      >
        <span className="sr-only">Enable Wwatcher</span>
        <span
          className={`${
            isChecked ? "translate-x-6" : "translate-x-1"
          }  inline-block  h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>

      {toolTip && toolTip?.length > 0 && (
        <CustomTooltip
          content={toolTip}
          el={<p className="text-gray-800">?</p>}
        />
      )}
    </div>
  );
};

export const CreateAuditEventType = ({
  client,
  formOpen,
  setFormOpen,
  formState,
  setFormState,
}: {
  client: Client;
  formOpen: boolean;
  setFormOpen: Function;
  formState: FormState;
  setFormState: Function;
}) => {
  const [name, setName] = useState(formState.name);
  const [description, setDescription] = useState(formState.description);

  const { toast } = useToast();

  useEffect(() => {
    setName(formState.name || "");
    setDescription(formState.description || "");
  }, [formState]);

  const queryClient = useQueryClient();

  const validateRequest = () => {
    if (!name || name == "") {
      return {
        passed: false,
        errorTitle: "Invalid Event Name!",
        errorDescription: "Event name must not be empty",
      };
    }

    return {
      passed: true,
      errorTitle: "",
      errorDescription: "",
    };
  };

  const save = useMutation(
    async ({ name, description }: Omit<FormState, "action">) => {
      const validation = validateRequest();
      if (!validation.passed) {
        toast({
          variant: "destructive",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: validation.errorTitle,
          description: validation.errorDescription,
        });
        return;
      }

      await client.audittrail.createAuditEventType({
        name,
        description,
      });

      setFormOpen(false);
    },
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(["sites"]);
        queryClient.invalidateQueries(["watchlist"]);
        toast({
          variant: "default",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: "Event Type Creation ",
          description: "New audit event type registered successfully",
        });
      },
      onError(error: any) {
        toast({
          variant: "destructive",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: "Event Type Creation Error",
          description: error.toString(),
        });
      },
    }
  );

  const update = useMutation(
    async ({ name, description }: Omit<FormState, "action" | "url">) => {
      const validation = validateRequest();
      if (!validation.passed) {
        toast({
          variant: "destructive",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: validation.errorTitle,
          description: validation.errorDescription,
        });
        return;
      }

      //   await client.audittrail.createAuditEventType(formState.id!, {
      //     description,
      //     name,
      //   });
      setFormOpen(false);
    },
    {
      onSuccess() {
        // queryClient.invalidateQueries(["sites"]);
        queryClient.invalidateQueries(["watchlist"]);
        toast({
          variant: "default",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: "Event Type Creation Error",
          description: "Audit Event Type updated successfully",
        });
        return;
      },
      onError(error: any, variables, context) {
        toast({
          variant: "destructive",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: "Event Type Update Error",
          description: error.toString(),
        });
        return;
      },
    }
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formState.action == "create") {
      save.mutate({
        name,
        description,
      });
    } else {
      update.mutate({
        name,
        description,
      });
    }
  };

  const onModalClosed = () => {
    setFormOpen(false);
  };

  if (!formOpen) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center space-x-1 rounded-md border border-transparent bg-[#00df9a] border-[#00df9a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 sm:w-auto"
        onClick={() => {
          setFormState({
            slug: "",
            ping_frequency: 6000,
            url: "",
            slack_webhook_url: "",
            notification_email: "",
            action: "create",
          });
          setFormOpen(true);
        }}
      >
        <PlusIcon /> <span>Add Audit Event Type</span>
      </button>
    );
  }

  return (
    <>
      <Transition appear show={formOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={onModalClosed}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="py-12 px-10 w-[750px] transform overflow-hidden rounded-lg bg-gray-50 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2 capitalize">
                      {formState.action} Service
                    </h3>
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={onSubmit} className="my-5 space-y-4">
                      <div>
                        <label className="w-[147px] text-right">
                          Event Name*
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="google.com"
                          className="flex-1 mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="w-[147px] text-right">
                          Description
                        </label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Google Checker"
                          className="flex-1 mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="flex items-center space-x-5">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-[#08C551] py-2 px-10 text-sm font-medium text-white shadow-sm enabled:hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-75 capitalize"
                          disabled={!validateRequest().passed}
                        >
                          {formState.action}
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-transparent border-green-200 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                          onClick={onModalClosed}
                        >
                          Got it, thanks!
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
