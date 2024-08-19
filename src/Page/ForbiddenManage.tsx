import * as React from 'react';
import './ForbiddenManage.css'
import { Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { ForbidTxtfield } from '../Component/ForbidTxtfield';
import { deleteBanWord, getBanWords, regPostBanWord } from '../api/hospital';

export interface ForbiddenManageProps {}
export interface WordProps {
id:number,
word:string,
}
export function ForbiddenManage(props: ForbiddenManageProps) {
    const [word, setWord] = React.useState("");
    const [delWord, setDelWord] = React.useState("");
    const [delId, setDelId] = React.useState<number|null>(null);
    const [banWords, setBanWords] = React.useState<WordProps[]>([]);

    const onChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    };

    const onChangeDelWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDelWord(event.target.value);
    };

    const onRegWord = async () => {
        console.log("word>>", word);
        const res = await regPostBanWord(word);
        console.log("금지어 등록 결과>>>", res);
        fetchGetBanWords(); // 금지어 등록 후 리스트를 갱신합니다.
    };
    const onDelWord = async (id:number|null) => {
        console.log("word>>", word);
        if (id) {
              const res = await deleteBanWord(id);
        console.log("금지어 삭제 결과>>>", res);
        fetchGetBanWords(); // 금지어 등록 후 리스트를 갱신합니다. 
        }
     
    };
    const fetchGetBanWords = async () => {
        const res = await getBanWords(1);
        console.log("금지어 리스트>>>",res)
        setBanWords(res);
    };

    React.useEffect(() => {
        fetchGetBanWords();
    }, []);

    return (
        <div className='forbid-container'>
            <Card
                variant='outlined'
                sx={{
                    width: "600px",
                    height: "100%",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Typography variant='h6'>금지어 관리</Typography>
                    
                    {/* 금지어 리스트 표시 */}
                    <List sx={{ width: '100%', bgcolor: 'background.paper', height: '600px', overflow: 'auto' }}>
                        {banWords.map((word, index) => (
                            <ListItem key={word.id} divider
                            sx={{
                                cursor:"pointer"
                            }}
                            onClick={()=>{
                                setDelWord(word.word)
                                setDelId(word.id)
                            }}
                            >
                                <ListItemText primary={word.word} />
                            </ListItem>
                        ))}
                    </List>

                    <div className="forbid-row">
                        <Typography>금지어 입력</Typography>
                        <ForbidTxtfield
                            word={word}
                            onChangeWord={onChangeWord}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: "#31873E",
                                ":hover": {
                                    backgroundColor: "#31873E",
                                }
                            }}
                            onClick={onRegWord}
                        >등록</Button>
                    </div>
                    <div className="forbid-row">
                        <Typography>금지어 삭제</Typography>
                        <ForbidTxtfield
                            word={delWord}
                            onChangeWord={onChangeDelWord}
                        />
                        <Button
                            variant='outlined'
                            sx={{
                                borderColor: "#999999",
                                color: "#999999",
                                ":hover": {
                                    borderColor: "#999999",
                                    color: "#999999",
                                }
                            }}
                            onClick={()=>{onDelWord(delId)}}
                        >삭제</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
