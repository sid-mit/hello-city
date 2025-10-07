import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Save, X, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Phrase {
  id: string;
  city: string;
  spot_type: string;
  sub_scenario: string;
  phrase_key: string;
  lang_code: string;
  translation_en: string;
  neutral_native: string;
  neutral_romanized: string;
  neutral_tts: string;
  female_native?: string | null;
  female_romanized?: string | null;
  female_tts?: string | null;
  male_native?: string | null;
  male_romanized?: string | null;
  male_tts?: string | null;
  notes?: string | null;
}

export function PhraseTableEditor() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Phrase>>({});
  const [isAdding, setIsAdding] = useState(false);
  const queryClient = useQueryClient();

  // Fetch all phrases
  const { data: phrases, isLoading } = useQuery({
    queryKey: ['all-phrases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('phrases')
        .select('*')
        .order('city', { ascending: true })
        .order('spot_type', { ascending: true });

      if (error) throw error;
      return data as Phrase[];
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (phrase: Phrase) => {
      const { error } = await supabase
        .from('phrases')
        .update(phrase)
        .eq('id', phrase.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-phrases'] });
      setEditingId(null);
      setEditForm({});
      toast({ title: 'Phrase updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error updating phrase', description: error.message, variant: 'destructive' });
    },
  });

  // Insert mutation
  const insertMutation = useMutation({
    mutationFn: async (phrase: Omit<Phrase, 'id'>) => {
      const { error } = await supabase.from('phrases').insert(phrase);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-phrases'] });
      setIsAdding(false);
      setEditForm({});
      toast({ title: 'Phrase added successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error adding phrase', description: error.message, variant: 'destructive' });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('phrases').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-phrases'] });
      toast({ title: 'Phrase deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting phrase', description: error.message, variant: 'destructive' });
    },
  });

  const handleEdit = (phrase: Phrase) => {
    setEditingId(phrase.id);
    setEditForm(phrase);
  };

  const handleSave = () => {
    if (editingId && editForm.id) {
      updateMutation.mutate(editForm as Phrase);
    } else if (isAdding) {
      // Validate required fields
      if (!editForm.city || !editForm.spot_type || !editForm.sub_scenario || !editForm.phrase_key || !editForm.lang_code || !editForm.translation_en || !editForm.neutral_native || !editForm.neutral_romanized || !editForm.neutral_tts) {
        toast({ title: 'Missing required fields', variant: 'destructive' });
        return;
      }
      insertMutation.mutate(editForm as Omit<Phrase, 'id'>);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this phrase?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditForm({
      city: '',
      spot_type: '',
      sub_scenario: '',
      phrase_key: '',
      lang_code: '',
      translation_en: '',
      neutral_native: '',
      neutral_romanized: '',
      neutral_tts: '',
    });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Loading phrases</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Phrase Database</h2>
        <Button onClick={handleAddNew} disabled={isAdding}>
          <Plus className="w-4 h-4 mr-2" />
          Add Phrase
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-muted">
              <tr className="border-b">
                <th className="p-2 text-left">City</th>
                <th className="p-2 text-left">Spot Type</th>
                <th className="p-2 text-left">Sub Scenario</th>
                <th className="p-2 text-left">Phrase Key</th>
                <th className="p-2 text-left">Lang</th>
                <th className="p-2 text-left">English</th>
                <th className="p-2 text-left">Native</th>
                <th className="p-2 text-left">Romanized</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isAdding && (
                <tr className="border-b bg-accent/20">
                  <td className="p-2"><Input value={editForm.city || ''} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} placeholder="City" /></td>
                  <td className="p-2"><Input value={editForm.spot_type || ''} onChange={(e) => setEditForm({ ...editForm, spot_type: e.target.value })} placeholder="spot_type" /></td>
                  <td className="p-2"><Input value={editForm.sub_scenario || ''} onChange={(e) => setEditForm({ ...editForm, sub_scenario: e.target.value })} placeholder="sub_scenario" /></td>
                  <td className="p-2"><Input value={editForm.phrase_key || ''} onChange={(e) => setEditForm({ ...editForm, phrase_key: e.target.value })} placeholder="phrase_key" /></td>
                  <td className="p-2"><Input value={editForm.lang_code || ''} onChange={(e) => setEditForm({ ...editForm, lang_code: e.target.value })} placeholder="fr" /></td>
                  <td className="p-2"><Input value={editForm.translation_en || ''} onChange={(e) => setEditForm({ ...editForm, translation_en: e.target.value })} placeholder="English" /></td>
                  <td className="p-2"><Input value={editForm.neutral_native || ''} onChange={(e) => setEditForm({ ...editForm, neutral_native: e.target.value })} placeholder="Native" /></td>
                  <td className="p-2"><Input value={editForm.neutral_romanized || ''} onChange={(e) => setEditForm({ ...editForm, neutral_romanized: e.target.value })} placeholder="Romanized" /></td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Button size="sm" onClick={handleSave}><Save className="w-3 h-3" /></Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel}><X className="w-3 h-3" /></Button>
                    </div>
                  </td>
                </tr>
              )}
              {phrases?.map((phrase) => (
                <tr key={phrase.id} className="border-b hover:bg-muted/50">
                  {editingId === phrase.id ? (
                    <>
                      <td className="p-2"><Input value={editForm.city || ''} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} /></td>
                      <td className="p-2"><Input value={editForm.spot_type || ''} onChange={(e) => setEditForm({ ...editForm, spot_type: e.target.value })} /></td>
                      <td className="p-2"><Input value={editForm.sub_scenario || ''} onChange={(e) => setEditForm({ ...editForm, sub_scenario: e.target.value })} /></td>
                      <td className="p-2"><Input value={editForm.phrase_key || ''} onChange={(e) => setEditForm({ ...editForm, phrase_key: e.target.value })} /></td>
                      <td className="p-2"><Input value={editForm.lang_code || ''} onChange={(e) => setEditForm({ ...editForm, lang_code: e.target.value })} /></td>
                      <td className="p-2"><Input value={editForm.translation_en || ''} onChange={(e) => setEditForm({ ...editForm, translation_en: e.target.value })} /></td>
                      <td className="p-2"><Input value={editForm.neutral_native || ''} onChange={(e) => setEditForm({ ...editForm, neutral_native: e.target.value })} /></td>
                      <td className="p-2"><Input value={editForm.neutral_romanized || ''} onChange={(e) => setEditForm({ ...editForm, neutral_romanized: e.target.value })} /></td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button size="sm" onClick={handleSave}><Save className="w-3 h-3" /></Button>
                          <Button size="sm" variant="ghost" onClick={handleCancel}><X className="w-3 h-3" /></Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{phrase.city}</td>
                      <td className="p-2">{phrase.spot_type}</td>
                      <td className="p-2">{phrase.sub_scenario}</td>
                      <td className="p-2">{phrase.phrase_key}</td>
                      <td className="p-2">{phrase.lang_code}</td>
                      <td className="p-2">{phrase.translation_en}</td>
                      <td className="p-2">{phrase.neutral_native}</td>
                      <td className="p-2">{phrase.neutral_romanized}</td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(phrase)}><Pencil className="w-3 h-3" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(phrase.id)}><Trash2 className="w-3 h-3" /></Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>

      <p className="text-sm text-muted-foreground mt-4">
        Total phrases: {phrases?.length || 0}
      </p>
    </Card>
  );
}
