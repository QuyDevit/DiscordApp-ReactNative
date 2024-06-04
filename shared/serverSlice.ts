import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore, { doc } from '@react-native-firebase/firestore';
import { TChannel, TServerData,IServerSlice } from './types';

const initialServerData: TServerData = {
  id: '',
  image: '',
  title: '',
  channels: [],
  createby: '',
  listmember: [],
  cratedate: 0
};

const initialState: IServerSlice= {
  servers: [],
  loading: false,
  error: null,
  channelData: {} as TChannel,
  serverData: {} as TServerData,
};

// Define the asynchronous thunk action creator to fetch the server data
export const fetchUserServers = createAsyncThunk(
  'server/fetchUserServers',
  async (userId: string, { rejectWithValue }) => {
    try {
      const snapshot = await firestore()
        .collection('SERVERS')
        .get()

      const servers: TServerData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data().image,
        title: doc.data().title,
        channels: doc.data().channels,
        createby: doc.data().createby,
        listmember: doc.data().listmember,
        cratedate: doc.data().cratedate.toMillis ? doc.data().cratedate.toMillis() : Date.now(),
      }));
    // Lọc các server mà trong listmember có chứa userId
      const filteredServers = servers.filter(server => 
        server.listmember.some(member => member.id === userId)
      );
      return filteredServers;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the server slice
const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {   
    setServerData: (state, action: PayloadAction<TServerData>) => {
      state.serverData = action.payload
    },
     setChannelData: (state, action: PayloadAction<TChannel>) => {
      state.channelData = action.payload
    },
    clearServers: (state) => {
      state.servers = null;
    }, 
    clearServerData: (state) => {
      state.serverData = initialServerData;
    },
      clearChannelData: (state) => {
      state.channelData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserServers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserServers.fulfilled, (state, action) => {
      state.servers = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUserServers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? (action.payload as string) : "Unknown error occurred";
    });
  },
});

export const { setServerData, setChannelData,clearServers,clearServerData,clearChannelData } = serverSlice.actions

export default serverSlice.reducer;
