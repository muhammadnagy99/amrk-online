import { socialMediaData } from "@/data/footer";
import SocialMedia from "./social-media";

export default function Footer() {

    return (
        <footer className="flex items-center justify-center w-full bg-FooterBg">
            <div className="flex flex-col items-center w-[95%] xl:w-10/12 py-16">
                <SocialMedia data={socialMediaData} />
            </div>
        </footer>
    );
}
