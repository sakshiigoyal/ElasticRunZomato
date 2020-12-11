import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 8,
  },
  rowStyle: { flexDirection: 'row' },
  flexStyle: { flex: 1 },
  locationStyle: {
    borderColor: 'black',
    borderWidth: 2,
    height: 40,
    fontSize: 18,
    marginHorizontal: 4,
  },
  textStyle: {
    fontSize: 14,
    borderColor: 'black',
    borderWidth: 2,
    height: 40,
    marginHorizontal: 4,
    textAlign: 'center',
  },
  bottomRow: { flexDirection: 'row', marginTop: 8 },
  buttonStyle: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'black',
    justifyContent: 'center',
  },
  saveText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  selectedItems: {
    height: 30,
    marginVertical: 4,
    backgroundColor: 'grey',
  },
});
