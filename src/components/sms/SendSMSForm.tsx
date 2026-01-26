'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import type { Hospital } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
  recipients: z.array(z.string()).refine(value => value.length > 0, {
    message: 'You must select at least one hospital.',
  }),
  isAutomated: z.boolean().default(false),
  schedule: z.string().optional(),
  backupReminder: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

type SendSMSFormProps = {
  hospitals: Hospital[];
  onSmsSent: (formValues: FormValues, targetHospitals: Hospital[]) => void;
};

export default function SendSMSForm({ hospitals, onSmsSent }: SendSMSFormProps) {
  const { toast } = useToast();
  const [isAutomated, setIsAutomated] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      recipients: [],
      isAutomated: false,
      schedule: undefined,
      backupReminder: false,
    },
  });

  function onSubmit(values: FormValues) {
    const selectedHospitals = values.recipients.map(id => hospitals.find(h => h.id === id)).filter(Boolean) as Hospital[];
    
    onSmsSent(values, selectedHospitals);

    toast({
      title: 'SMS Queued',
      description: `Your message is being sent to ${selectedHospitals.length} hospital(s).`,
    });

    if (values.isAutomated) {
        toast({
            title: 'Automation Scheduled',
            description: `Message will be sent daily at 8:00 am. Backup reminder is ${values.backupReminder ? 'on' : 'off'}.`
        })
    }
  }

  const allHospitalIds = hospitals.map(h => h.id);
  const watchedRecipients = form.watch('recipients');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipients"
          render={() => (
            <FormItem>
                <div className="mb-4">
                    <FormLabel>Recipients</FormLabel>
                    <FormDescription>
                        Select the hospitals to send the message to.
                    </FormDescription>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                        id="select-all"
                        onCheckedChange={(checked) => {
                            form.setValue('recipients', checked ? allHospitalIds : [], { shouldValidate: true });
                        }}
                        checked={watchedRecipients.length === allHospitalIds.length}
                        />
                    <Label htmlFor="select-all" className="font-medium">Select All</Label>
                </div>
                <ScrollArea className="h-40 w-full rounded-md border">
                    <div className="p-4">
                    {hospitals.map((hospital) => (
                    <FormField
                        key={hospital.id}
                        control={form.control}
                        name="recipients"
                        render={({ field }) => {
                        return (
                            <FormItem
                            key={hospital.id}
                            className="flex flex-row items-start space-x-3 space-y-0 mb-3"
                            >
                            <FormControl>
                                <Checkbox
                                checked={field.value?.includes(hospital.id)}
                                onCheckedChange={(checked) => {
                                    const newValue = checked
                                    ? [...field.value, hospital.id]
                                    : field.value?.filter(
                                        (value) => value !== hospital.id
                                      );
                                    field.onChange(newValue);
                                }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal">
                                {hospital.name}
                            </FormLabel>
                            </FormItem>
                        )
                        }}
                    />
                    ))}
                    </div>
                </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAutomated"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <FormLabel>Automate</FormLabel>
                    <FormDescription>
                        Schedule this message to be sent automatically.
                    </FormDescription>
                </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setIsAutomated(checked);
                    if (!checked) {
                      form.setValue('schedule', undefined);
                      form.setValue('backupReminder', false);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {isAutomated && (
            <div className="space-y-6 rounded-lg border p-4 animate-accordion-down">
                 <FormField
                    control={form.control}
                    name="schedule"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Schedule</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="daily_8am" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                 Send Daily at 8:00 am (Sudan Time)
                                </FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="backupReminder"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                                <FormLabel>Backup Reminder</FormLabel>
                                <FormDescription>
                                    Enable a reminder if no response is received.
                                </FormDescription>
                            </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        )}

        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </Form>
  );
}
