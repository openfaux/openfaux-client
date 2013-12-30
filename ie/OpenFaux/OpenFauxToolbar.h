#pragma once

#include "stdafx.h"

class COpenFauxToolbar : public CWindowImpl<COpenFauxToolbar>
{
public:
	DECLARE_WND_SUPERCLASS(L"OpenFauxToolbar", TOOLBARCLASSNAME)
	
	BEGIN_MSG_MAP(COpenFauxToolbar)
		MESSAGE_HANDLER(WM_CREATE, OnCreate)
		MESSAGE_HANDLER(WM_SIZE, OnSize)
		MESSAGE_HANDLER(WM_COMMAND, OnCommand)
	END_MSG_MAP()

	LRESULT OnCreate(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
	LRESULT OnSize(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
	LRESULT OnCommand(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);

	COpenFauxToolbar();
	virtual ~COpenFauxToolbar();

	void CreateToolbarWindow(HWND hwnd, RECT rect);
	void setEnabledState(BOOL enabled);
	//HWND toolbar() { return m_toolbar; }
private:
	BOOL m_bEnabled;
	HIMAGELIST m_hImageList;
	//HWND m_toolbar;
};
