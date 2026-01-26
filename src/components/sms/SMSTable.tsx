import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { SMSLog } from '@/lib/types';
import { format } from 'date-fns';

type SMSTableProps = {
  smsLogs: SMSLog[];
};

export default function SMSTable({ smsLogs }: SMSTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Time</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Reported Water (L)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {smsLogs.length > 0 ? (
            smsLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium whitespace-nowrap">{format(log.time, 'MMM d, yyyy, h:mm a')}</TableCell>
                <TableCell className="whitespace-nowrap">{log.hospitalName}</TableCell>
                <TableCell>{log.phone}</TableCell>
                <TableCell>
                  <Badge variant="outline">{log.message}</Badge>
                </TableCell>
                <TableCell className="text-right">{log.waterAmount.toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No messages received yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
