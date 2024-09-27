import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import UploadForm from "@/components/uploads/Form";

const CreateUploadsPage = () => {
  return (
    <>
      <Header title="Upload Image" />
      <Card className="p-6 w-full lg:w-1/2">
        <UploadForm />
      </Card>
    </>
  );
};

export default CreateUploadsPage;
