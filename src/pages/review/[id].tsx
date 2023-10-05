import { Autocomplete, Box, Button, Card, Rating, TextField } from "@mui/material";
import * as React from "react";
import axios from "axios";

export default function AddReview() {
    const [value, setValue] = React.useState(2);
    const [selected, setSelected] = React.useState();
    const options = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
    ];
    const [file] = React.useState();
    const uploadFileWithRetry = async (file: File, fileName: string, retries: number): Promise<string | null> => {

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const { data: { clientUrl } } = await axios.post<{ clientUrl: string }>(`/api/r2/presignedURL`, {
                    filename: fileName,
                    filetype: file.type,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const result = await axios.put(clientUrl, file, {
                    headers: {
                        'Content-Type': file.type,
                    },
                });

                if (result.status == 200) {
                    setUploadedFiles(prev => prev.map((item: { name: string; }) =>
                        item.name === fileName
                            ? { ...item, status: 'uploaded' }
                            : item
                    ));
                    // return `images/galleries/${selectedGallery.id}/${fileName}`;
                } else {
                    throw new Error('Upload failed.');
                }
            } catch (error) {
                if (attempt === retries - 1) throw error;
            }
        }
        return null;
    };
 
    function sendReview(){}

    return (
        <div className="review">

            {/* De stilizat titlul paginii */}
            <h1>Reviews page</h1>
            <Card variant="outlined" sx={{ minWidth: 500 }}>
                <Box
                    sx={{
                        "& > legend": { mt: 2 },
                    }}
                >
                    <label>Choose the event</label>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        onChange={(event, selectedValue:any ) => setSelected(selectedValue)}
                        // De adaugat evenimentele incheiate din baza de date
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Event" />}
                    />
                    <label>
                        Add your rating here
                    </label>
                    <br></br>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue: any) => {
                            setValue(newValue);
                        }}
                    />
                    <br></br>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Describe your experience regarding the event"
                        multiline
                        variant="filled"
                        style = {{width: 500}}
                    />
                </Box>
            </Card>


            <div className="Image">
                <h2>Add Image:</h2>
                <input type="file" onChange={(event) =>
                    uploadFileWithRetry // calling the handleChange function
                } />
                <img src={file} />
            </div>

            <Button variant="contained" onClick={sendReview}>Send review!</Button>
        </div>
    );
}

function setUploadedFiles(arg0: (prev: any) => any) {
    throw new Error("Function not implemented.");
}

