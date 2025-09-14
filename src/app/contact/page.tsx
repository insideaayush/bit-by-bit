import styles from './contact.module.css';
import { getContactData } from '@/lib/contact-data';
import TerminalContact from '@/components/TerminalContact';

export default async function Contact() {
  const data = getContactData();

  if (!data) {
    return <div>No contact data found.</div>;
  }

  return (
    <div className={styles.contactPageContainer}>
      <h1>Contact Me</h1>
      <p>I&apos;m always open to new opportunities and collaborations. Feel free to reach out!</p>
      <TerminalContact contact={data.contact} />
    </div>
  );
}