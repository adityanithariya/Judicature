import SearchBar from '@components/evault/dashboard/SearchBar';
import TableList from '@components/icons/TableList';
import { MdInfoOutline } from 'react-icons/md';

const MyFiles = () => {
    return (
        <div className="my-8 mx-5">
            <SearchBar />
            <div className="mt-8 mx-6">
                <div className="flex justify-between">
                    <h2 className="text-lg">My Files</h2>
                    <div className="flex gap-10">
                        <TableList className="w-6 h-6" />
                        <MdInfoOutline className="w-[1.3rem] h-6" />
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default MyFiles;
