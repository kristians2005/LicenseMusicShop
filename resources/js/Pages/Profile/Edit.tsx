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

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body flex flex-row flex-wrap gap-4 align-middle">
                            <Theme />
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
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
