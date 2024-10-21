import FolderTree from "@/components/folder_tree";
import DownloadIcon from "@/components/icons/download";
import FolderIcon from "@/components/icons/folder/folder_icon";
import { User } from "@/models/models";
import { downloadArchive, getArchives, getUsers, uploadArchive } from "@/scripts/http-requests/endpoints";
import { getSessionUser } from "@/scripts/utils/userService";
import { useEffect, useState } from "react";

function ArchivesPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [archives, setArchives] = useState<any[]>([]);
    const [tree, setTree] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const areas = ["Gestao", "Tecnica", "Administrativa", "Negocios"];

    async function fetchUsers() {
        const users = await getUsers();
        console.log(users);
        setUsers(users);
    }

    async function fetchArchives() {
        const archives = await getArchives();
        console.log(archives);
        setArchives(archives);
        setTree(distributeAreas()); // Update the tree structure after fetching archives
    }

    async function fetchCurrentUser() {
        const user = await getSessionUser();
        console.log(user);
        setCurrentUser(user);
    }

    useEffect(() => {
        fetchUsers();
        fetchArchives();
        fetchCurrentUser();
    }, []);

    function distributeAreas() {
        return areas.map((area, index) => ({
            id: `area-${index}`,
            key: `area-${index}`,
            label: area,
            children: distributeUsers(area),
            startIcon: <FolderIcon className="w-5 h-5"/>,
        }));
    }

    function distributeUsers(area: string) {
        if (!currentUser) return [];

        const filteredUsers = currentUser.admin
            ? users.filter((user) => user.area === area)
            : users.filter((user) => currentUser.area === area && user.id === currentUser.id);

        return filteredUsers.map((user) => ({
            id: `user-${user.id}`,
            key: `user-${user.id}`,
            label: user.name,
            children: distributeFiles(user.id as string),
            startIcon: <FolderIcon className="w-5 h-5"/>,
            cb: fetchArchives, // Pass fetchArchives as the callback
        }));
    }

    function distributeFiles(userId: string) {
        return archives
            .filter((archive) => archive.userId === userId)
            .map((archive) => ({
                id: `archive-${archive.id}`,
                key: `archive-${archive.id}`,
                label: archive.name,
                onClick: () => downloadArchive(archive.filePath),
                startIcon: <DownloadIcon className="w-6 h-6"/>,
            }));
    }
    useEffect(() => {
        setTree(distributeAreas());
    }, [users, archives, currentUser]);

    return (
        <div className="bg-white min-h-screen flex flex-col justify-start">
            <section className="ticket">
                <FolderTree
                    nodes={tree}
                />
            </section>
        </div>
    );
}

export default ArchivesPage;