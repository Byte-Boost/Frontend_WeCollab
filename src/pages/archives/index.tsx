import FolderTree from "@/components/FolderTree/folder_tree";
import FileIcon from "@/components/icons/file";
import FolderIcon from "@/components/icons/folder/folder_icon";
import { User } from "@/models/models";
import { deleteArchive, downloadArchive, getArchives, getAreas, getUsers} from "@/scripts/http-requests/endpoints";
import { getSessionUser } from "@/scripts/utils/userService";
import Head from "next/head";
import { useEffect, useState } from "react";

function ArchivesPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [archives, setArchives] = useState<any[]>([]);
    const [tree, setTree] = useState<any[]>([]);
    const [globalTree, setGlobalTree] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [areas, setAreas] = useState<string[]>([]);

    async function fetchUsers() {
        const users = await getUsers();
        setUsers(users.rows);
    }

    async function fetchAreas() {
        if (currentUser?.admin) {
            const areas = await getAreas({});
            setAreas(areas.map((area) => area.name));
        } else if (currentUser) {
            setAreas([currentUser.area as string]);
        }
    }

    async function fetchArchives() {
        const archives = await getArchives();
        setArchives(archives);
    }

    async function fetchCurrentUser() {
        const user = await getSessionUser();
        setCurrentUser(user as unknown as User);
    }

    function distributeAreas() {
        const rootNode = {
            id: 'root',
            key: 'root',
            label: 'Áreas',
            children: areas.map((area, index) => ({
                id: `area-${index}`,
                key: `area-${index}`,
                label: area,
                children: [
                    ...distributeUsers(area),
                    ...distributeFilesForAreas(area)
                ],
                startIcon: <FolderIcon className="w-5 h-5" color="#C82333"/>,
                type: 'area',
                cb: fetchArchives,
            })),
            startIcon: <FolderIcon className="w-5 h-5" color="#FD7E14"/>,
            type: 'root',
            
        }
        ;
        return [rootNode];
    }

    function distributeUsers(area: string) {
        if (!currentUser) return [];

        const filteredUsers = currentUser.admin
            ? users.filter((user) => user.area === area)
            : users.filter((user) => {
                const isMatch = user.id === currentUser.id;
                return isMatch;
            });
        return filteredUsers.map((user) => ({
            id: `user-${user.id}`,
            key: `user-${user.id}`,
            label: user.name,
            children: distributeFilesForUsers(user.id as string),
            startIcon: <FolderIcon className="w-5 h-5" color="#007BFF"/>,
            cb: fetchArchives,
            type: 'user',
        }));
    }

    function distributeFilesForUsers(userId: string) {
        return archives
            .filter((archive) => archive.userId === userId)
            .map((archive) => ({
                id: `archive-${archive.id}`,
                key: `archive-${archive.id}`,
                label: archive.name,
                downloadAction: () => downloadArchive(archive.filePath, archive.name),
                deleteAction: () => deleteArchive(archive.filePath),
                cb: fetchData,
                startIcon: <FileIcon className="w-5 h-5 "/>,
                type: 'archive',
            }));
    }
    function distributeFilesForAreas(area: string | null) {
        return archives
            .filter((archive) => archive.areaName === area && !archive.userId)
            .map((archive) => ({
                id: `archive-${archive.id}`,
                key: `archive-${archive.id}`,
                label: archive.name,
                downloadAction: () => downloadArchive(archive.filePath, archive.name),
                deleteAction: () => deleteArchive(archive.filePath),
                cb: fetchData,
                startIcon: <FileIcon className="w-5 h-5" />,
                type: 'archive',
            }));
        }

    async function fetchData() {
        await fetchCurrentUser();
        await fetchUsers();
        await fetchAreas();
        await fetchArchives();
    }

    useEffect(() => {
        fetchData();
    }, [currentUser?.area]);

    useEffect(() => {
        setTree([
            ...distributeAreas(),
        ]);
        setGlobalTree([
            {
                id: 'global',
                key: 'global',
                label: 'Público',
                children: distributeFilesForAreas(null),
                startIcon: <FolderIcon className="w-5 h-5" color="#FD7E14"/>,
                cb: fetchArchives,
                type: 'global',
            }
        ]);
    }, [users, archives, currentUser, areas]);

    return (
        <div className="bg-white min-h-screen flex flex-col justify-start">
            <Head>
                <title>Arquivos - WeCollab</title>
            </Head>
            <section className="ticket">
                <FolderTree nodes={tree} />
                <FolderTree nodes={globalTree} />
            </section>
        </div>
    );
}

export default ArchivesPage;