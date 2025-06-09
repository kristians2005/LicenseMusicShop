import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import User from "@/Layouts/UserLayout";
import Theme from "@/Components/PageSettings/Theme";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps & { mustVerifyEmail: boolean; status?: string }) {
    return (
        <User>
            <Head title="Profile" />

            <div className="py-12 flex justify-center">
                <div className="w-full max-w-7xl space-y-6 px-4 flex flex-col items-center">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body m-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </User>
    );
}
