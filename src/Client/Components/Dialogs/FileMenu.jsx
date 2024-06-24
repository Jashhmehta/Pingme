import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../Redux/reducers/misc";
import { AudioFile, Image, UploadFile, VideoFile } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../Redux/API/api";

const FileMenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const imageRef = useRef(null);
  const VideoRef = useRef(null);
  const AudioRef = useRef(null);
  const FileRef = useRef(null);
  const dispatch = useDispatch();
  const [sendAttachments] = useSendAttachmentsMutation();
  const closeFileMenu = () => dispatch(setIsFileMenu(false));
  const selectRef = (ref) => {
    ref.current.click();
  };

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) return;
    if (files.length > 10)
      return toast.error("You can only upload 10 files at a time");
    dispatch(setUploadingLoader(true));
    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();
    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);
      console.log(res);
      if (res.data) toast.success("Files sent successfully", { id: toastId });
      else toast.error("Failed to send files", { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => selectRef(imageRef)}>
            <Tooltip title="Image">
              <Image />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif, image/jpg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(AudioRef)}>
            <Tooltip title="Audio">
              <AudioFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audio")}
              ref={AudioRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(VideoRef)}>
            <Tooltip title="Video">
              <VideoFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Video")}
              ref={VideoRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(FileRef)}>
            <Tooltip title="File">
              <UploadFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "File")}
              ref={FileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
