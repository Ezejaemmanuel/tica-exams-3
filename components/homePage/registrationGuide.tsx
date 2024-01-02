
import { FaRegListAlt, FaKey, FaClock } from 'react-icons/fa';
import Card from "./card"
const steps = [
    {
        title: 'Register',
        subtitle: 'Start Here',
        instructions: 'Click the "Register Now" button above. Provide your personal details, including your email and WhatsApp numbers, then submit the form.',
        Icon: FaRegListAlt
    },
    {
        title: 'Login',
        subtitle: 'Access Your Account',
        instructions: 'Upon receiving your login credentials, revisit the website. Use these credentials to access your account. Ensure all required documents are uploaded.',
        Icon: FaKey
    },
    {
        title: 'Await Confirmation',
        subtitle: 'Final Step',
        instructions: 'Please patiently await your registration confirmation within a week. Post-confirmation, you will receive the curriculum and the online examination date. Prepare diligently!',
        Icon: FaClock
    }
];

const RegistrationGuide = () => {
    return (
        <>
            <h2 className="text-2xl md:text-4xl font-bold mb-16 bg-gradient-to-r from-pink-500 my-10 to-red-500 dark:from-pink-300 dark:to-red-300 animate-pulse text-transparent bg-clip-text text-center mx-auto">This is how to get started </h2>
            <div className="flex flex-col md:flex-row items-stretch md:space-x-4 space-y-4 md:space-y-0 justify-evenly">
                {steps.map((step, index) => (
                    <div className="flex-grow" key={index}>
                        <div className="transition-all duration-500 ease-in-out transform hover:scale-105">
                            <Card title={step.title} subtitle={step.subtitle} instructions={step.instructions} Icon={step.Icon} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default RegistrationGuide;

