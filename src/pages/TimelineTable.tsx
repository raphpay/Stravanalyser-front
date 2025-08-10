import type Timeline from "../business-logic/models/Timeline";

interface Props {
  timeline: Timeline[];
}

export default function TimelineTable({ timeline }: Props) {
  return (
    <table className="table-auto border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">Date</th>
          <th className="border border-gray-300 px-2 py-1">TSS</th>
          <th className="border border-gray-300 px-2 py-1">CTL</th>
          <th className="border border-gray-300 px-2 py-1">ATL</th>
          <th className="border border-gray-300 px-2 py-1">TSB</th>
        </tr>
      </thead>
      <tbody>
        {timeline.map(({ date, tss, ctl, atl, tsb }) => (
          <tr key={date}>
            <td className="border border-gray-300 px-2 py-1">{date}</td>
            <td className="border border-gray-300 px-2 py-1">
              {tss.toFixed(1)}
            </td>
            <td className="border border-gray-300 px-2 py-1">
              {ctl !== undefined ? ctl.toFixed(1) : "-"}
            </td>
            <td className="border border-gray-300 px-2 py-1">
              {atl !== undefined ? atl.toFixed(1) : "-"}
            </td>
            <td className="border border-gray-300 px-2 py-1">
              {tsb !== undefined ? tsb.toFixed(1) : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
