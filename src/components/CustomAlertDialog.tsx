import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface CustomAlertDialogProps {
  open: boolean;
  onAlertClosed: Function;
  onSubmit: Function;
  title?: string;
  subtitle?: string;
}
export const CustomAlertDialog = ({
  open,
  onAlertClosed,
  onSubmit,
  title = "Are you absolutely sure?",
  subtitle = "This action cannot be undone. This will permanently delete your service, watchers and logs from our servers.",
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={() => onAlertClosed}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent className="bg-white ">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{subtitle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onAlertClosed()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-600 hover:opacity-70"
            onClick={() => onSubmit()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
