import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  useOffices,
  useCreateOffice,
  useUpdateOffice,
  useDeleteOffice,
} from "../../../hooks/useOffices";
import type { Office } from "../../../api/offices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/offices/")({
  component: OfficesPage,
});

function OfficesPage() {
  const { data: offices, isLoading } = useOffices();
  const createOffice = useCreateOffice();
  const updateOffice = useUpdateOffice();
  const deleteOffice = useDeleteOffice();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Office | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Office | null>(null);

  const emptyForm = { code: "", name: "", address: "" };
  const [form, setForm] = useState(emptyForm);

  const handleCreate = () => {
    createOffice.mutate(form, {
      onSuccess: () => {
        setCreateOpen(false);
        setForm(emptyForm);
      },
    });
  };

  const handleEdit = () => {
    if (!editTarget) return;
    updateOffice.mutate(
      { id: editTarget.id, data: form },
      {
        onSuccess: () => {
          setEditTarget(null);
          setForm(emptyForm);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteOffice.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const FormFields = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>Code</Label>
        <Input
          value={form.code}
          onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
          placeholder="e.g. OSL"
        />
      </div>
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. Oslo Office"
        />
      </div>
      <div className="grid gap-2">
        <Label>Address</Label>
        <Input
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          placeholder="e.g. Karl Johans gate 1"
        />
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Offices</h1>
        <Button
          onClick={() => {
            setForm(emptyForm);
            setCreateOpen(true);
          }}
        >
          <Plus size={16} className="mr-2" /> Add office
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {offices?.map((office) => (
              <TableRow key={office.id}>
                <TableCell>{office.code}</TableCell>
                <TableCell>{office.name}</TableCell>
                <TableCell>{office.address}</TableCell>
                <TableCell>
                  {new Date(office.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditTarget(office);
                      setForm({
                        code: office.code,
                        name: office.name,
                        address: office.address,
                      });
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(office)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add office</DialogTitle>
          </DialogHeader>
          <FormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={createOffice.isPending}>
              {createOffice.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit office</DialogTitle>
          </DialogHeader>
          <FormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={updateOffice.isPending}>
              {updateOffice.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteOffice.isPending}
            >
              {deleteOffice.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
