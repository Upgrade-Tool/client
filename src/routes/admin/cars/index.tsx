import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  useCars,
  useCreateCar,
  useUpdateCar,
  useDeleteCar,
  useToggleActiveCar,
} from "../../../hooks/useCars";
import { useBrands } from "../../../hooks/useBrands";
import { useCarGroups } from "../../../hooks/useCarGroups";
import type { Car, Drivetrain, Transmission } from "../../../api/cars";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react";

export const Route = createFileRoute("/admin/cars/")({
  component: CarsPage,
});

const emptyForm = {
  name: "",
  brandId: "",
  groupId: "",
  horsepower: 0,
  rangeKm: 0,
  drivetrain: "AWD" as Drivetrain,
  transmission: "Automatic" as Transmission,
  carValueFactor: 1.0,
  imageUrlSideLeft: null as string | null,
  imageUrlSideRight: null as string | null,
  imageUrlDisplay: null as string | null,
};

type FormValues = typeof emptyForm;

interface FormFieldsProps {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  brands: { id: string; name: string }[] | undefined;
  carGroups: { id: string; name: string; code: string }[] | undefined;
}

function FormFields({ form, setForm, brands, carGroups }: FormFieldsProps) {
  return (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. BMW i4 M50"
        />
      </div>

      <div className="grid gap-2">
        <Label>Brand</Label>
        <Select
          value={form.brandId}
          onValueChange={(v) => setForm((f) => ({ ...f, brandId: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands?.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Car group</Label>
        <Select
          value={form.groupId}
          onValueChange={(v) => setForm((f) => ({ ...f, groupId: v }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select group" />
          </SelectTrigger>
          <SelectContent>
            {carGroups?.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Horsepower</Label>
          <Input
            type="number"
            value={form.horsepower}
            onChange={(e) =>
              setForm((f) => ({ ...f, horsepower: Number(e.target.value) }))
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>Range (km)</Label>
          <Input
            type="number"
            value={form.rangeKm}
            onChange={(e) =>
              setForm((f) => ({ ...f, rangeKm: Number(e.target.value) }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Drivetrain</Label>
          <Select
            value={form.drivetrain}
            onValueChange={(v) =>
              setForm((f) => ({ ...f, drivetrain: v as Drivetrain }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AWD">AWD</SelectItem>
              <SelectItem value="RWD">RWD</SelectItem>
              <SelectItem value="FWD">FWD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Transmission</Label>
          <Select
            value={form.transmission}
            onValueChange={(v) =>
              setForm((f) => ({ ...f, transmission: v as Transmission }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Car value factor</Label>
        <Input
          type="number"
          step="0.1"
          value={form.carValueFactor}
          onChange={(e) =>
            setForm((f) => ({ ...f, carValueFactor: Number(e.target.value) }))
          }
        />
      </div>

      <div className="grid gap-2">
        <Label>Image URL — side left</Label>
        <Input
          value={form.imageUrlSideLeft ?? ""}
          onChange={(e) =>
            setForm((f) => ({ ...f, imageUrlSideLeft: e.target.value || null }))
          }
          placeholder="https://..."
        />
      </div>
      <div className="grid gap-2">
        <Label>Image URL — side right</Label>
        <Input
          value={form.imageUrlSideRight ?? ""}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              imageUrlSideRight: e.target.value || null,
            }))
          }
          placeholder="https://..."
        />
      </div>
      <div className="grid gap-2">
        <Label>Image URL — display</Label>
        <Input
          value={form.imageUrlDisplay ?? ""}
          onChange={(e) =>
            setForm((f) => ({ ...f, imageUrlDisplay: e.target.value || null }))
          }
          placeholder="https://..."
        />
      </div>
    </div>
  );
}

function CarsPage() {
  const { data: cars, isLoading } = useCars();
  const { data: brands } = useBrands();
  const { data: carGroups } = useCarGroups();
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();
  const deleteCar = useDeleteCar();
  const toggleActive = useToggleActiveCar();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Car | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);
  const [form, setForm] = useState<FormValues>(emptyForm);

  const handleCreate = () => {
    createCar.mutate(form, {
      onSuccess: () => {
        setCreateOpen(false);
        setForm(emptyForm);
      },
    });
  };

  const handleEdit = () => {
    if (!editTarget) return;
    updateCar.mutate(
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
    deleteCar.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Cars</h1>
        <Button
          onClick={() => {
            setForm(emptyForm);
            setCreateOpen(true);
          }}
        >
          <Plus size={16} className="mr-2" /> Add car
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>HP</TableHead>
              <TableHead>Range</TableHead>
              <TableHead>Drivetrain</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars?.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.brandName}</TableCell>
                <TableCell>{car.groupCode}</TableCell>
                <TableCell>{car.horsepower}</TableCell>
                <TableCell>{car.rangeKm} km</TableCell>
                <TableCell>{car.drivetrain}</TableCell>
                <TableCell>
                  <Badge variant={car.isActive ? "default" : "secondary"}>
                    {car.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActive.mutate(car.id)}
                  >
                    {car.isActive ? (
                      <ToggleRight size={16} />
                    ) : (
                      <ToggleLeft size={16} />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditTarget(car);
                      setForm({
                        name: car.name,
                        brandId: car.brandId,
                        groupId: car.groupId,
                        horsepower: car.horsepower,
                        rangeKm: car.rangeKm,
                        drivetrain: car.drivetrain,
                        transmission: car.transmission,
                        carValueFactor: car.carValueFactor,
                        imageUrlSideLeft: car.imageUrlSideLeft,
                        imageUrlSideRight: car.imageUrlSideRight,
                        imageUrlDisplay: car.imageUrlDisplay,
                      });
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(car)}
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add car</DialogTitle>
          </DialogHeader>
          <FormFields
            form={form}
            setForm={setForm}
            brands={brands}
            carGroups={carGroups}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={createCar.isPending}>
              {createCar.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit car</DialogTitle>
          </DialogHeader>
          <FormFields
            form={form}
            setForm={setForm}
            brands={brands}
            carGroups={carGroups}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={updateCar.isPending}>
              {updateCar.isPending ? "Saving..." : "Save"}
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
              disabled={deleteCar.isPending}
            >
              {deleteCar.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
