import { useNavigate } from 'react-router-dom';
import { PhraseImporter } from '@/components/Admin/PhraseImporter';
import { Button } from '@/components/ui/button';
import { Play, ArrowLeft } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App
        </Button>
        
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        
        <Button
          size="lg"
          onClick={() => navigate('/admin/import')}
          className="mb-8"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Full Database Import
        </Button>

        <PhraseImporter />
      </div>
    </div>
  );
};

export default Admin;
