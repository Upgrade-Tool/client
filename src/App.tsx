import Container from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import tavaScanHoyre from "@/assets/images/TAVASCAN_HØYRE.avif";
import audiQ6Venstre from "@/assets/images/Q6_VENSTRE.avif";
import CarImage from "@/components/ui/carimage";
import SpecRow from "@/components/ui/specrow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Gauge, BatteryCharging, Zap, Check } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen w-screen bg-zinc-400 dark:bg-[#121212]">
      <Container className="w-full max-w-none px-8 bg-zinc-500/60">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">VELG KJØRETØY</h1>
          <div className="mx-auto mt-3 h-1 w-28 rounded bg-yellow-400" />
        </div>

        {/* Cards */}
        <div className="flex w-full justify-between px-6">
          <Card className="w-[420px] shrink-0">
            <CardHeader className="items-center text-center">
              <CardTitle>
                Cupra Tavascan AWD
                <div className="mx-auto mt-3 h-1 w-28 rounded bg-yellow-400" />
              </CardTitle>
              <Badge variant="secondary">
                <Check></Check>Valgt
              </Badge>
              <CarImage src={tavaScanHoyre} alt="Cupra Tavascan" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-px w-full bg-zinc-200" />

              <div className="grid gap-1">
                <SpecRow
                  label="Hjuldrift"
                  value="Firehjulsdrift"
                  icon={<Settings size={20} />}
                />
                <SpecRow
                  label="Girkasse"
                  value="Automatgir"
                  icon={<Gauge size={20} />}
                />
                <SpecRow
                  label="Rekkevidde"
                  value="550 Km"
                  icon={<BatteryCharging size={20} />}
                />
                <SpecRow
                  label="Effekt"
                  value="456 Hk"
                  icon={<Zap size={20} />}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="w-[420px] shrink-0">
            <CardHeader className="items-center text-center">
              <CardTitle>
                Audi Q6 Etron AWD
                <div className="mx-auto mt-3 h-1 w-28 rounded bg-yellow-400" />
              </CardTitle>
              <Badge variant="secondary" className="bg-slate-600 text-white">
                Tilgjengelig alternativ
              </Badge>{" "}
              <CarImage
                src={audiQ6Venstre}
                alt="Audi Q6 Etron"
                size="lg"
                belowText={<span>+ 167,- NOK /dag</span>}
              />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-px w-full bg-zinc-200" />

              <div className="grid gap-1">
                <SpecRow
                  label="Hjuldrift"
                  value="Firehjulsdrift"
                  icon={<Settings size={20} />}
                />
                <SpecRow
                  label="Girkasse"
                  value="Automatgir"
                  icon={<Gauge size={20} />}
                />
                <SpecRow
                  label="Rekkevidde"
                  value="550 Km"
                  icon={<BatteryCharging size={20} />}
                />
                <SpecRow
                  label="Effekt"
                  value="456 Hk"
                  icon={<Zap size={20} />}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default App;
