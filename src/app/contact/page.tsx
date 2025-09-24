import { getContactData } from '@/lib/contact-data';
import ContactClientContent from '@/components/ContactClientContent'; // Import the new client component
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Aayush Gautam',
  description: 'Contact information for Aayush Gautam.',
};

export default async function Contact() {
  const data = getContactData(); // This now runs on the server

  if (!data) {
    return <div>No contact data found.</div>;
  }

  return (
    <ContactClientContent data={data} /> // Pass data to the client component
  );
}