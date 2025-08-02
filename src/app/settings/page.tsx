import AppLayout from '@/components/layout/app-layout';
import { SettingsForm } from '@/components/auth/settings-form';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <SettingsForm />
        </div>
      </div>
    </AppLayout>
  );
}
