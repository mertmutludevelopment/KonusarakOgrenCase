import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.pageInfo}>{`${currentPage} / ${totalPages}`}</Text>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={[styles.button, currentPage === totalPages && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(25),
  },
  button: {
    padding: moderateScale(10),
    backgroundColor: '#007bff',
    borderRadius: scale(5),
    flex: 1,
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
  },
  pageInfo: {
    fontSize: scale(18),
  },
});

export default Pagination;