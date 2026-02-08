import React from "react";

type SpecRowProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export function SpecRow({ label, value, icon }: SpecRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3 text-lg font-semibold text-zinc-900">
        {icon ? <span className="text-zinc-700">{icon}</span> : null}
        <span>{label}</span>
      </div>

      <div className="text-lg font-bold text-zinc-900">{value}</div>
    </div>
  );
}

export default SpecRow;
