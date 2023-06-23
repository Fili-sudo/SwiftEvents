import logo from './logo.svg';
import StartPage from 'pages/start';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MyEvents from 'pages/my_events';
import Guest from 'pages/guest';
import AddFilesTab from 'pages/my_events/tabs/uploadPicturesTab/addFilesTab';
import CustomPaginationActionsTable from 'pages/my_events/tabs/guestsTab/guestTable';
import TableTabs from 'pages/my_events/tabs/tablesTab/tablesTab';
import ImagesTab from 'pages/my_events/tabs/imagesTab/imagesTab';
import GuestInfoTab from 'pages/guest/tabs/guestInfoTab/guestInfoTab';
import GuestImagesTab from 'pages/guest/tabs/guestImagesTab/guestImagesTab';

function App() {
  return (
    <Routes>
      <Route path="/" element = {<StartPage/>}/>
      <Route path="/my_events/:id" element = {<MyEvents/>}>
        <Route index element={<CustomPaginationActionsTable />} />
        <Route path="guests" element={<CustomPaginationActionsTable/>}/>
        <Route path="tables" element={<TableTabs/>}/>
        <Route path="upload_pictures" element={<AddFilesTab/>}/>
        <Route path="image_list" element={<ImagesTab/>}/>
      </Route>
      <Route path="/guest/:id" element = {<Guest/>}>
        <Route index element={<GuestInfoTab />} />
        <Route path="info" element={<GuestInfoTab/>}/>
        <Route path="image_list" element={<GuestImagesTab/>}/>
      </Route>
    </Routes>
  );
}

export default App;
