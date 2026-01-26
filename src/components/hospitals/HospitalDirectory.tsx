'use client';

import { hospitals } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Phone } from 'lucide-react';

export default function HospitalDirectory() {
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hospital Directory</h1>
        <p className="text-muted-foreground">Contact and location information for all network hospitals.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Hospitals ({hospitals.length})</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Hospital Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Manager Contact</TableHead>
                    <TableHead>Hospital Contact</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {hospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                    <TableCell className="font-medium whitespace-nowrap">{hospital.name}</TableCell>
                    <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                            <MapPin className="h-3 w-3" />
                            {hospital.location.lat.toFixed(3)}, {hospital.location.lng.toFixed(3)}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                           <User className="h-4 w-4 text-muted-foreground" />
                           <span>{hospital.managerName}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                           <Phone className="h-4 w-4 text-muted-foreground" />
                           <span>{hospital.managerContact}</span>
                        </div>
                    </TableCell>
                    <TableCell>{hospital.phone}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
