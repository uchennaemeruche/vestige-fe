import { Row } from "@tanstack/react-table";
import { CollapsibleContent } from "./ui/collapsible";
import { TableCell, TableRow } from "./ui/table";
import { AuditDataJsonViewer } from "./AuditJsonView";
import { audittrail } from "@/client";

export interface AuditTrailDetailProps {
  row: Row<audittrail.Audit>;
}
export const AuditTrailDetail = <TData, TValue>({
  row,
}: AuditTrailDetailProps) => {
  return (
    <CollapsibleContent asChild className=" bg-gray-100 ">
      <TableRow>
        <TableCell colSpan={row.getVisibleCells().length + 1} className="pl-24">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">
              {row.original.timestamp} - {row.original.audit_type?.Name}
            </h3>
          </div>

          {/* <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">
                  Donec porta enim vel{" "}
                </h3>
                <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                  Dec 2020
                </time>
                <p className="mt-3">
                  Pellentesque feugiat ante at nisl efficitur, in mollis orci
                  scelerisque. Interdum et malesuada fames ac ante ipsum primis
                  in faucibus.
                </p>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">
                  Aliquam sit amet nunc ut
                </h3>
                <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                  Jul 2019
                </time>
                <p className="mt-3">
                  Morbi vulputate aliquam libero non dictum. Aliquam sit amet
                  nunc ut diam aliquet tincidunt nec nec dui. Donec mollis
                  turpis eget egestas sodales.
                </p>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-600">
                <h3 className="text-xl font-semibold tracking-wide">
                  Pellentesque habitant morbi
                </h3>
                <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                  Jan 2016
                </time>
                <p className="mt-3">
                  Suspendisse tincidunt, arcu nec faucibus efficitur, justo
                  velit consectetur nisl, sit amet condimentum lacus orci nec
                  purus. Mauris quis quam suscipit, vehicula felis id, vehicula
                  enim.
                </p>
              </div>
            </div>
          </div> */}

          <ul className="h-64 overflow-scroll">
            <li>
              <article>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-4 xl:grid-cols-12 hover:dark:bg-gray-50"
                >
                  <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                    {row.original.id}
                  </h3>
                  <time
                    dateTime=""
                    className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600"
                  >
                    Project ID
                  </time>
                  <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">
                    {row.original.meta_data?.toString()}
                  </p>
                </a>
              </article>
            </li>
            <li>
              <article>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-4 xl:grid-cols-12 hover:dark:bg-gray-50"
                >
                  <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                    {row.original.actor?.id}
                  </h3>
                  <time
                    dateTime=""
                    className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600"
                  >
                    Actor
                  </time>
                  <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">
                    {row.original.actor!.Meta?.toString()}
                  </p>
                </a>
              </article>
            </li>
            <li>
              <article>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-4 xl:grid-cols-12 hover:dark:bg-gray-50"
                >
                  <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                    {row.original.action}
                  </h3>
                  <time
                    dateTime=""
                    className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600"
                  >
                    Action
                  </time>
                  <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700"></p>
                </a>
              </article>
            </li>
            <li>
              <article>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-4 xl:grid-cols-12 hover:dark:bg-gray-50"
                >
                  <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                    {row.original.audit_type?.Name}
                  </h3>
                  <time
                    dateTime=""
                    className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600"
                  >
                    Access Method
                  </time>
                  <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">
                    {row.original.audit_type?.Slug}
                  </p>
                </a>
              </article>
            </li>

            <li>
              <article>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-4 xl:grid-cols-12 hover:dark:bg-gray-50"
                >
                  <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                    Nigeria (NG)
                  </h3>
                  <time
                    dateTime=""
                    className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600"
                  >
                    GeoTag
                  </time>
                  <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">
                    Lorem ipsum dolor sit.
                  </p>
                </a>
              </article>
            </li>

            <li>
              <article>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-4 xl:grid-cols-12 hover:dark:bg-gray-50"
                >
                  <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                    {row.original.context?.user_agent}
                  </h3>
                  <time
                    dateTime=""
                    className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600"
                  >
                    Device
                  </time>
                  <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">
                    {row.original.context?.host_addr}
                  </p>
                </a>
              </article>
            </li>

            <li>
              <article>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-4 xl:grid-cols-12 hover:dark:bg-gray-50"
                >
                  <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
                    {row.original.remote_address}
                  </h3>
                  <time
                    dateTime=""
                    className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600"
                  >
                    Remote Address
                  </time>
                  <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">
                    {row.original.context?.client_ip}
                  </p>
                </a>
              </article>
            </li>
          </ul>
          <AuditDataJsonViewer data={row.original as any} />

          {/* <div className="flex mx-auto gap-40">
            <div className="space-y-8">
              <div>
                <p>Project ID</p>
                <p>{row.original.id}</p>
              </div>
              <div>
                <p>Access Method</p>
                <p>{row.original.action}</p>
              </div>
              <div>
                <p>GeoTag</p>
                <p>Nigeria (NG)</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <p>User ID</p>
                <p>{row.original.id}</p>
              </div>
              <div>
                <p>Actor</p>
                <p>{row.original.actor?.id}</p>
              </div>
              <div>
                <p>Remote IP</p>
                <p>{row.original.remote_address}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <p>Device Type</p>
                <p>{row.original.context?.user_agent}</p>
              </div>

              <div>
                <p>Timestamp</p>
                <p>{row.original.timestamp}</p>
              </div>

              <div>
                <p>Location</p>
                <p>{row.original.context?.client_ip}</p>
              </div>
            </div>
            <AuditDataJsonViewer data={row.original as any} />
          </div> */}
        </TableCell>
      </TableRow>
    </CollapsibleContent>
  );
};
