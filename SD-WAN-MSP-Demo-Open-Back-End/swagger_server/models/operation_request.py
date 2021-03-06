# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class OperationRequest(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, method: str=None, url: str=None):  # noqa: E501
        """OperationRequest - a model defined in Swagger

        :param method: The method of this OperationRequest.  # noqa: E501
        :type method: str
        :param url: The url of this OperationRequest.  # noqa: E501
        :type url: str
        """
        self.swagger_types = {
            'method': str,
            'url': str
        }

        self.attribute_map = {
            'method': 'method',
            'url': 'url'
        }

        self._method = method
        self._url = url

    @classmethod
    def from_dict(cls, dikt) -> 'OperationRequest':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Operation_request of this OperationRequest.  # noqa: E501
        :rtype: OperationRequest
        """
        return util.deserialize_model(dikt, cls)

    @property
    def method(self) -> str:
        """Gets the method of this OperationRequest.


        :return: The method of this OperationRequest.
        :rtype: str
        """
        return self._method

    @method.setter
    def method(self, method: str):
        """Sets the method of this OperationRequest.


        :param method: The method of this OperationRequest.
        :type method: str
        """
        allowed_values = ["GET", "POST", "PUT", "DELETE"]  # noqa: E501
        if method not in allowed_values:
            raise ValueError(
                "Invalid value for `method` ({0}), must be one of {1}"
                .format(method, allowed_values)
            )

        self._method = method

    @property
    def url(self) -> str:
        """Gets the url of this OperationRequest.


        :return: The url of this OperationRequest.
        :rtype: str
        """
        return self._url

    @url.setter
    def url(self, url: str):
        """Sets the url of this OperationRequest.


        :param url: The url of this OperationRequest.
        :type url: str
        """

        self._url = url
