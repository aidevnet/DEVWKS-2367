# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.operation_input_parameters import OperationInputParameters  # noqa: F401,E501
from swagger_server.models.operation_request import OperationRequest  # noqa: F401,E501
from swagger_server import util


class Operation(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, operation_id: str=None, operation_name: str=None, description: str=None, input_parameters: List[OperationInputParameters]=None, request: OperationRequest=None, returns: object=None):  # noqa: E501
        """Operation - a model defined in Swagger

        :param operation_id: The operation_id of this Operation.  # noqa: E501
        :type operation_id: str
        :param operation_name: The operation_name of this Operation.  # noqa: E501
        :type operation_name: str
        :param description: The description of this Operation.  # noqa: E501
        :type description: str
        :param input_parameters: The input_parameters of this Operation.  # noqa: E501
        :type input_parameters: List[OperationInputParameters]
        :param request: The request of this Operation.  # noqa: E501
        :type request: OperationRequest
        :param returns: The returns of this Operation.  # noqa: E501
        :type returns: object
        """
        self.swagger_types = {
            'operation_id': str,
            'operation_name': str,
            'description': str,
            'input_parameters': List[OperationInputParameters],
            'request': OperationRequest,
            'returns': object
        }

        self.attribute_map = {
            'operation_id': 'operation_id',
            'operation_name': 'operation_name',
            'description': 'description',
            'input_parameters': 'input_parameters',
            'request': 'request',
            'returns': 'returns'
        }

        self._operation_id = operation_id
        self._operation_name = operation_name
        self._description = description
        self._input_parameters = input_parameters
        self._request = request
        self._returns = returns

    @classmethod
    def from_dict(cls, dikt) -> 'Operation':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Operation of this Operation.  # noqa: E501
        :rtype: Operation
        """
        return util.deserialize_model(dikt, cls)

    @property
    def operation_id(self) -> str:
        """Gets the operation_id of this Operation.


        :return: The operation_id of this Operation.
        :rtype: str
        """
        return self._operation_id

    @operation_id.setter
    def operation_id(self, operation_id: str):
        """Sets the operation_id of this Operation.


        :param operation_id: The operation_id of this Operation.
        :type operation_id: str
        """

        self._operation_id = operation_id

    @property
    def operation_name(self) -> str:
        """Gets the operation_name of this Operation.


        :return: The operation_name of this Operation.
        :rtype: str
        """
        return self._operation_name

    @operation_name.setter
    def operation_name(self, operation_name: str):
        """Sets the operation_name of this Operation.


        :param operation_name: The operation_name of this Operation.
        :type operation_name: str
        """

        self._operation_name = operation_name

    @property
    def description(self) -> str:
        """Gets the description of this Operation.


        :return: The description of this Operation.
        :rtype: str
        """
        return self._description

    @description.setter
    def description(self, description: str):
        """Sets the description of this Operation.


        :param description: The description of this Operation.
        :type description: str
        """

        self._description = description

    @property
    def input_parameters(self) -> List[OperationInputParameters]:
        """Gets the input_parameters of this Operation.


        :return: The input_parameters of this Operation.
        :rtype: List[OperationInputParameters]
        """
        return self._input_parameters

    @input_parameters.setter
    def input_parameters(self, input_parameters: List[OperationInputParameters]):
        """Sets the input_parameters of this Operation.


        :param input_parameters: The input_parameters of this Operation.
        :type input_parameters: List[OperationInputParameters]
        """

        self._input_parameters = input_parameters

    @property
    def request(self) -> OperationRequest:
        """Gets the request of this Operation.


        :return: The request of this Operation.
        :rtype: OperationRequest
        """
        return self._request

    @request.setter
    def request(self, request: OperationRequest):
        """Sets the request of this Operation.


        :param request: The request of this Operation.
        :type request: OperationRequest
        """

        self._request = request

    @property
    def returns(self) -> object:
        """Gets the returns of this Operation.


        :return: The returns of this Operation.
        :rtype: object
        """
        return self._returns

    @returns.setter
    def returns(self, returns: object):
        """Sets the returns of this Operation.


        :param returns: The returns of this Operation.
        :type returns: object
        """

        self._returns = returns
