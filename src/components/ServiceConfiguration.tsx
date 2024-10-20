import Client from "@/client";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { CustomTooltip } from "./CustomTooltip";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

const validURL = (url: string) => {
  const idx = url?.lastIndexOf(".");
  if (idx === -1 || url?.substring(idx + 1) === "") {
    return false;
  }

  if (!url?.startsWith("http:") && !url?.startsWith("https:")) {
    url = "https://" + url;
  }

  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (_) {
    return false;
  }
};

const validEmail = (email: string) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return email.match(regex) ? true : false;
};

export interface FormState {
  id?: string;
  url: string;
  slug: string;
  webhook_address: string;
  email_address: string;
  description?: string;
  watch_service?: boolean;
  enable_email_notification: boolean;
  enable_webhook_notification: boolean;
  ping_frequency: string;
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

export const NotificationConfiguration = ({
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
  const [url, setUrl] = useState(formState.url);
  const [slug, setSlug] = useState(formState.slug);

  const [pingFrequency, setPingFrequency] = useState(formState.ping_frequency);

  const [webhookUrl, setWebhookUrl] = useState(formState.webhook_address);
  const [email, setEmail] = useState(formState.email_address);
  const [description, setDescription] = useState("");

  const [emailNotification, setEmailNotification] = useState(
    formState.enable_email_notification
  );
  const [webhookNotification, setWebhookNotification] = useState(
    formState.enable_webhook_notification
  );
  const [watchService, setWatchService] = useState(formState.watch_service!);

  const { toast } = useToast();

  useEffect(() => {
    setSlug(formState.slug || "");
    setPingFrequency(formState.ping_frequency);
    setUrl(formState.url);
    setWebhookUrl(formState.webhook_address || "");
    setEmail(formState.email_address || "");
    setDescription(formState.description || "");
    setEmailNotification(formState.enable_email_notification || false);
    setWebhookNotification(formState.enable_webhook_notification);
    setWatchService(formState.watch_service || false);
  }, [formState]);

  const queryClient = useQueryClient();

  const validateRequest = () => {
    if (!validURL(url)) {
      return {
        passed: false,
        errorTitle: "Invalid URL!",
        errorDescription: "Kindly ensure that the URL is in correct format",
      };
    }
    if (webhookUrl && !validURL(webhookUrl)) {
      return {
        passed: false,
        errorTitle: "Invalid Webhook URL!",
        errorDescription:
          "Kindly ensure that the Webhook URL is in correct format",
      };
    }
    if (email && !validEmail(email)) {
      return {
        passed: false,
        errorTitle: "Invalid Notification Email!",
        errorDescription:
          "Kindly ensure that the notification email is correct",
      };
    }
    if (!email && !webhookUrl) {
      return {
        passed: false,
        errorTitle: "Invalid Request",
        errorDescription: "You must provide atleast one notification channel",
      };
    }

    return {
      passed: true,
      errorTitle: "",
      errorDescription: "",
    };
  };

  const save = useMutation(
    async ({
      url,
      webhook_address,
      email_address,
      description,
      enable_email_notification,
      enable_webhook_notification,
      ping_frequency,
      slug,
    }: Omit<FormState, "action">) => {
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

      await client.uptime.AddNewService({
        // url,
        // webhook_address,
        // email_address,
        // description: description!,
        // enable_email_notification,
        // enable_webhook_notification,
        slug,
        url,
        description,
        email_address,
        enable_email_notification,
        enable_webhook_notification,
        ping_frequency,
        webhook_address,
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
          title: "Service Creation ",
          description: "New service configured successfully",
        });
      },
      onError(error: any) {
        toast({
          variant: "destructive",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: "Service Creation Error",
          description: error.toString(),
        });
      },
    }
  );

  const update = useMutation(
    async ({
      webhook_address,
      email_address,
      enable_email_notification,
      enable_webhook_notification,
      watch_service,
      ping_frequency,
      slug,
    }: Omit<FormState, "action" | "url">) => {
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

      // const payload = {
      //   email_address,
      //   webhook_address,
      //   description: description!,
      //   enable_email_notification,
      //   enable_webhook_notification,
      //   watch_service,
      // };

      await client.uptime.UpdateWatchItem(formState.id!, {
        description,
        email_address,
        enable_email_notification,
        enable_webhook_notification,
        is_watching: watchService,
        ping_frequency: pingFrequency,
        slug,
        webhook_address,
      });
      setFormOpen(false);
    },
    {
      onSuccess() {
        // queryClient.invalidateQueries(["sites"]);
        queryClient.invalidateQueries(["watchlist"]);
        toast({
          variant: "default",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: "Service Creation Error",
          description: "service updated successfully",
        });
        return;
      },
      onError(error: any, variables, context) {
        toast({
          variant: "destructive",
          className: cn("fixed top-5 right-5 w-[400px] "),
          title: "Service Update Error",
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
        email_address: email,
        slug,
        enable_email_notification: emailNotification,
        enable_webhook_notification: webhookNotification,
        ping_frequency: pingFrequency,
        url,
        webhook_address: webhookUrl,
        description,
      });
    } else {
      update.mutate({
        ping_frequency: pingFrequency,
        slug,
        webhook_address: webhookUrl,
        email_address: email,
        enable_email_notification: emailNotification,
        enable_webhook_notification: webhookNotification,
        watch_service: watchService,
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
        className="inline-flex items-center justify-center space-x-1 rounded-md border border-transparent border-[#00df9a] px-4 py-2 text-sm font-medium text-[#08C551] shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 sm:w-auto"
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
        <PlusIcon /> <span>Configure Service</span>
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
                          Service URL*
                        </label>
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="google.com"
                          className="flex-1 mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="w-[147px] text-right">Slug*</label>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
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

                      <div>
                        <label className=" text-right flex justify-between items-center">
                          <p>
                            {" "}
                            Slack Webhook URL
                            <span className="text-gray-400">?</span>{" "}
                          </p>{" "}
                          <CustomSwitch
                            toolTip="Enable Webhook Notification to the URL below"
                            bgColor="bg-blue-600"
                            isChecked={webhookNotification ?? false}
                            setIsChecked={setWebhookNotification}
                          />
                        </label>
                        <input
                          type="text"
                          value={webhookUrl}
                          onChange={(e) => {
                            setWebhookUrl(e.target.value);
                            if (e.target.value.length >= 5) {
                              setWebhookNotification(true);
                            } else setWebhookNotification(false);
                          }}
                          placeholder="https://hooks.slack.com/services/ABR32/JSTEW/232NS03MS23NMS3"
                          className="flex-1 mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="text-right flex justify-between items-center">
                          <p>
                            Notification Email Adress
                            <span className="text-gray-400">?</span>{" "}
                          </p>{" "}
                          <CustomSwitch
                            toolTip="Enable Email Notification to the URL below"
                            bgColor="bg-blue-600"
                            isChecked={emailNotification}
                            setIsChecked={setEmailNotification}
                          />
                        </label>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value.length >= 5) {
                              setEmailNotification(true);
                            } else setEmailNotification(false);
                          }}
                          placeholder="notifications@mydomain.com"
                          className="flex-1 mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      {formState.action == "update" && (
                        <div className="flex justify-between items-center p-4 my-4 border rounded border-dashed border-red-300 space-x-2">
                          <div className="space-y-0.5">
                            <h2 className="text-base text-gray-600">
                              Watch Service
                            </h2>
                            <h3 className="text-gray-400">
                              Add or remove this service from watchlist.
                            </h3>
                          </div>
                          <CustomSwitch
                            toolTip="You'll not get notifications on unwatched
                            services"
                            isChecked={watchService!}
                            setIsChecked={setWatchService}
                          />
                        </div>
                      )}

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
