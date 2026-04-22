import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  useCarGroups,
  useCreateCarGroup,
  useUpdateCarGroup,
  useDeleteCarGroup,
} from "../../../hooks/useCarGroups";
import type { CarGroup } from "../../../api/carGroups";
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

export const Route = createFileRoute("/admin/car-groups/")({
  component: CarGroupsPage,
});

function CarGroupsPage() {
  const { data: carGroups, isLoading } = useCarGroups();
  const createCarGroup = useCreateCarGroup();
  const updateCarGroup = useUpdateCarGroup();
  const deleteCarGroup = useDeleteCarGroup();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CarGroup | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CarGroup | null>(null);

  const emptyForm = { code: "", name: "", drivetrainType: "", sortOrder: 0 };
  const [form, setForm] = useState(emptyForm);

  const handleCreate = () => {
    createCarGroup.mutate(form, {
      onSuccess: () => {
        setCreateOpen(false);
        setForm(emptyForm);
      },
    });
  };

  const handleEdit = () => {
    if (!editTarget) return;
    updateCarGroup.mutate(
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
    deleteCarGroup.mutate(deleteTarget.id, {
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
          placeholder="e.g. SUV"
        />
      </div>
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. Electric SUV"
        />
      </div>
      <div className="grid gap-2">
        <Label>Drivetrain type</Label>
        <Input
          value={form.drivetrainType}
          onChange={(e) =>
            setForm((f) => ({ ...f, drivetrainType: e.target.value }))
          }
          placeholder="e.g. AWD"
        />
      </div>
      <div className="grid gap-2">
        <Label>Sort order</Label>
        <Input
          type="number"
          value={form.sortOrder}
          onChange={(e) =>
            setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
          }
        />
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Car groups</h1>
        <Button
          onClick={() => {
            setForm(emptyForm);
            setCreateOpen(true);
          }}
        >
          <Plus size={16} className="mr-2" /> Add car group
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
              <TableHead>Drivetrain</TableHead>
              <TableHead>Sort order</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {carGroups?.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.code}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.drivetrainType}</TableCell>
                <TableCell>{group.sortOrder}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditTarget(group);
                      setForm({
                        code: group.code,
                        name: group.name,
                        drivetrainType: group.drivetrainType,
                        sortOrder: group.sortOrder,
                      });
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(group)}
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
            <DialogTitle>Add car group</DialogTitle>
          </DialogHeader>
          <FormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={createCarGroup.isPending}>
              {createCarGroup.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit car group</DialogTitle>
          </DialogHeader>
          <FormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={updateCarGroup.isPending}>
              {updateCarGroup.isPending ? "Saving..." : "Save"}
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
              disabled={deleteCarGroup.isPending}
            >
              {deleteCarGroup.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
