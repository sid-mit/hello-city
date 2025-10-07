import { PhraseImporter } from '@/components/Admin/PhraseImporter';
import { PhraseTableEditor } from '@/components/Admin/PhraseTableEditor';
import { PhraseResetter } from '@/components/Admin/PhraseResetter';
import { CSVImporter } from '@/components/Admin/CSVImporter';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        
        <div className="space-y-8">
          <CSVImporter />
          <PhraseImporter />
          <PhraseResetter />
          <PhraseTableEditor />
        </div>
      </div>
    </div>
  );
};

export default Admin;
