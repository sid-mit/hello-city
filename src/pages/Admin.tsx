import { PhraseImporter } from '@/components/Admin/PhraseImporter';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <PhraseImporter />
      </div>
    </div>
  );
};

export default Admin;
