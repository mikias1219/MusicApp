import styled from '@emotion/styled';

export const FormContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
`;

export const FormTitle = styled.h2`
  color: #007bff;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:first-of-type {
    background-color: #007bff;
    color: white;
    margin-right: 10px;
  }

  &:last-of-type {
    background-color: #6c757d;
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  color: #333;

  /* For responsiveness */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// New section for Music Display
export const MusicDisplayContainer = styled.div`
  background-color: #f9f9f9;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .music-details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .music-thumbnail {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 20px;
  }

  .music-info {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .music-title {
    font-size: 18px;
    color: #007bff;
    font-weight: bold;
  }

  .music-artist {
    font-size: 14px;
    color: #555;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .music-info {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export const VideoSection = styled.div`
  flex: 1;
  margin-left: 20px;

  .video-player {
    iframe {
      width: 100%;
      height: 300px;

      @media (min-width: 768px) {
        height: 400px;
      }
    }
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 20px;
  }
`;

export const SongListContainer = styled.div`
  flex: 2;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  h2 {
    font-size: 24px;
    color: #007bff;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #007bff;
    color: white;
    text-transform: uppercase;
    font-size: 14px;
  }

  tr {
    transition: background-color 0.3s;
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .add-button {
    background-color: #28a745;
    color: white;
    font-weight: bold;
  }

  .edit-button {
    background-color: #ffc107;
    color: black;
  }

  .delete-button {
    background-color: #dc3545;
    color: white;
  }

  .play-button {
    background-color: #007bff;
    color: white;
  }

  button:hover {
    opacity: 0.85;
  }

  .link {
    display: inline-flex;
    align-items: center;
    color: #007bff;
    text-decoration: none;
    font-size: 16px;
  }

  .link:hover {
    text-decoration: underline;
  }

  .icon {
    font-size: 18px;
    margin-right: 6px;
  }
`;

export const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  select {
    padding: 8px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;
