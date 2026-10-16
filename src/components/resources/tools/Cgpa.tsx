import { formulaTable, lookupTable } from "@/lib/resources/tools/cgpa";
import { Note } from "../Kit";
import { LightSection, SectionHeading } from "../../ui";

function Table({ columns, rows, caption }: { columns: string[]; rows: string[][]; caption: string }) {
  return (
    <div data-reveal className="mt-12 overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-xl shadow-hero-950/5">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-5 py-4">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-5 py-3.5 font-semibold text-navy">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-5 py-3.5 text-slate-600">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The formula table and the ready-reference chart. */
export function CgpaTables() {
  return (
    <LightSection>
      <SectionHeading
        eyebrow={formulaTable.eyebrow}
        title={
          <>
            Common CGPA <span className="text-gradient">conversion formulas</span>
          </>
        }
        text={formulaTable.text}
      />
      <Table columns={formulaTable.columns} rows={formulaTable.rows} caption={formulaTable.heading} />

      <div className="mt-24">
        <SectionHeading
          eyebrow={lookupTable.eyebrow}
          title={
            <>
              CGPA to percentage <span className="text-gradient">ready reference</span>
            </>
          }
          text={lookupTable.text}
        />
        <Table columns={lookupTable.columns} rows={lookupTable.rows} caption={lookupTable.heading} />
        <Note>
          These are the common formulas, not any one university&apos;s rule. Before you put a percentage on a
          job application, confirm it against your marksheet or your university&apos;s ordinance — for example
          AKTU or your own university&apos;s published rules.
        </Note>
      </div>
    </LightSection>
  );
}
