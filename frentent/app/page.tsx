import Homepage from "@/src/Components/Homepage";

const page = () => {
  return (
    <main suppressHydrationWarning={true} className="min-h-screen ">
      <Homepage />
    </main>
  );
};

export default page;
