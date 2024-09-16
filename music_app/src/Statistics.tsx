import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Table, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);



interface StatisticsType {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    songsPerGenre: { _id: string; count: number }[];
    songsAndAlbumsPerArtist: { artist: string; songCount: number; albumCount: number }[];
    songsPerAlbum: { _id: string; count: number }[];
}

const Statistics: React.FC = () => {
    const [statistics, setStatistics] = useState<StatisticsType | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('https://musicapp-3.onrender.com/statistics');
                setStatistics(response.data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };
        fetchStatistics();
    }, []);

    if (!statistics) return <div className="container">Loading statistics...</div>;

    // Pie chart data for genres
    const genreData = {
        labels: statistics.songsPerGenre.map(genre => genre._id),
        datasets: [{
            data: statistics.songsPerGenre.map(genre => genre.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }],
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Overall Statistics</h2>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Header>Total Numbers</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>Total Songs:</td>
                                        <td>{statistics.totalSongs}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Artists:</td>
                                        <td>{statistics.totalArtists}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Albums:</td>
                                        <td>{statistics.totalAlbums}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Genres:</td>
                                        <td>{statistics.totalGenres}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>Songs Per Genre</Card.Header>
                        <Card.Body>
                            <Pie data={genreData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>Songs and Albums Per Artist</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Artist</th>
                                        <th>Songs</th>
                                        <th>Albums</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statistics.songsAndAlbumsPerArtist.map(artist => (
                                        <tr key={artist.artist}>
                                            <td>{artist.artist}</td>
                                            <td>{artist.songCount}</td>
                                            <td>{artist.albumCount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>Songs Per Album</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Album</th>
                                        <th>Songs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statistics.songsPerAlbum.map(album => (
                                        <tr key={album._id}>
                                            <td>{album._id}</td>
                                            <td>{album.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Statistics;
