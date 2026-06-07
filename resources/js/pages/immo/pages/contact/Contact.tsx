import AppPublicLayout from '@/layouts/app-public-layout';
import ContactExperience from './Contacts';


type ContactPageProps = {
    categories: Record<string, string>;
    contactMeta: {
        appName: string;
        email: string;
        address:string;
        phone: string | null;
        responseTime: string;
        availability: string;
        supportHours: string;
        location: string;
    };
};

function Contact({ categories, contactMeta }: ContactPageProps) {

    return (
        <ContactExperience categories={categories} contactMeta={contactMeta} />
    );
}

Contact.layout = (page: React.ReactNode) => (
    <AppPublicLayout >{page}</AppPublicLayout>
);

export default Contact;
