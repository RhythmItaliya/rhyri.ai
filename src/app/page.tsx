import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Header from './ui/Header';
import Footer from '@/app/ui/Footer';
import { authOptions } from '@/config/auth.config';

export const dynamic = 'force-dynamic';

const HomePage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const userName = session.user?.name || 'User';
    const userImage = session.user?.image || 'https://ui-avatars.com/api/?name=User';
    const userEmail = session.user?.email || '';

    return (
        <>
            <Header user={{ name: userName, image: userImage, email: userEmail }} />
            <main className="max-w-3xl mx-auto p-6 flex-1">
                <div className="text-gray-700">You are signed in with Google.</div>
            </main>
            <Footer />
        </>
    );
};

export default HomePage;
