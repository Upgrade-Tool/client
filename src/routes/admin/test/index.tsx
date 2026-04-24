import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCars } from "../../../hooks/useCars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/admin/test/")({
  component: TestDashboardPage,
});

function TestDashboardPage() {
  const queryClient = useQueryClient();
  const { data: cars, isLoading, isError, error, isFetching } = useCars();

  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // --- Filtering by brand ---
  const filteredCars = useMemo(() => {
    return (cars ?? []).filter((car) => {
      return selectedBrand === "" || car.brandName === selectedBrand;
    });
  }, [cars, selectedBrand]);

  // --- Unique brand names for filter ---
  const brandOptions = useMemo(() => {
    return [...new Set((cars ?? []).map((c) => c.brandName))];
  }, [cars]);

  // --- Loading state ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading cars...</span>
      </div>
    );
  }

  // --- Error state ---
  if (isError) {
    return (
      <div className="p-8">
        <Card className="border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">
              Error fetching cars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["cars"] })
              }
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total cars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{cars?.length ?? 0}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">
              {cars?.filter((c) => c.isActive).length ?? 0}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Inactive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">
              {cars?.filter((c) => !c.isActive).length ?? 0}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Header + filter + count */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Cars</h1>
        <div className="flex items-center gap-2">
          {isFetching && <Loader2 className="h-4 w-4 animate-spin" />}
          <Badge variant="secondary">{filteredCars.length} rows</Badge>
        </div>
      </div>

      {/* Brand filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button
          variant={selectedBrand === "" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedBrand("")}
        >
          All brands
        </Button>
        {brandOptions.map((brand) => (
          <Button
            key={brand}
            variant={selectedBrand === brand ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedBrand(brand)}
          >
            {brand}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Table>
        <TableCaption>List of all cars</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>HP</TableHead>
            <TableHead>Range</TableHead>
            <TableHead>Drivetrain</TableHead>
            <TableHead>Transmission</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCars.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center text-muted-foreground"
              >
                No cars found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.brandName}</TableCell>
                <TableCell>{car.groupCode}</TableCell>
                <TableCell>{car.horsepower}</TableCell>
                <TableCell>{car.rangeKm} km</TableCell>
                <TableCell>{car.drivetrain}</TableCell>
                <TableCell>{car.transmission}</TableCell>
                <TableCell>
                  <Badge variant={car.isActive ? "default" : "secondary"}>
                    {car.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
