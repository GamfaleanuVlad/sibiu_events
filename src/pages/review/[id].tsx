import { Autocomplete, Box, Button, Card, CardContent, InputLabel, Rating, TextField, Typography } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";

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

    function sendReview() { }

    return (
        <div className="review flex flex-col items-center justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Reviews page</h1>
            <Card variant="outlined" sx={{ minWidth: 500 }}>
                <CardContent>
                    <Box
                    className="flex flex-col"
                        sx={{
                            "& > legend": { mt: 2 },
                        }}
                    >
                        <InputLabel className="font-bold">Choose the event</InputLabel >
                        <Autocomplete
                        className="mb-5"
                            disablePortal
                            id="combo-box-demo"
                            value={selected}
                            onChange={(event, selectedValue: any) => setSelected(selectedValue)}
                            options={options}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Event" />}
                        />
                        <InputLabel className="font-bold">
                            Add your rating here
                        </InputLabel>
                        <Rating
                            name="simple-controlled"
                        className="mb-5"
                            value={value}
                            onChange={(event, newValue: any) => {
                                setValue(newValue);
                            }}
                        />
                        <InputLabel className="font-bold">Describe your experience regarding the event</InputLabel>
                        <TextField
                            id="filled-multiline-flexible"
                            className="mb-5"
                            multiline
                            variant="filled"
                            style={{ width: 500 }}
                        />
                        <InputLabel className="font-bold">Import image</InputLabel>
                        <input 
                        className="mb-5"
                        type="file" onChange={(event) =>
                            uploadFileWithRetry
                        } />
                        <img src={file} />
                        <Button className="button-upload mb-4 self-center" variant="outlined" onClick={sendReview}>Send review!</Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

function setUploadedFiles(arg0: (prev: any) => any) {
    throw new Error("Function not implemented.");
}

